

import { UIData } from '../scripts/uidata';
import {  MapData } from '../scripts/mapdata';
import { Cell } from '../scripts/Cell';
import { AXLE_SIZE } from '../state';
import { Bomb } from '../scripts/Bomb';
import { UINode } from '../ui-node';
import { Asset, AudioClip, Node, SpriteFrame, UITransform, Vec3, find, resources, tween } from 'cc';
import { Score } from '../scripts/Score';
import {panel_data} from '../scripts/Panel/State'
import {PanelEntry} from '../scripts/Panel'
import { Evaluate } from '../scripts/Evaluate';




/**
 * 坐标转换成位置
 * @param x 横坐标
 * @param y 纵坐标
 * @returns 转换后位置
 */
export const coordToPosition = (x:number,y:number) => {

  return {
    x:UIData.inst.CellWidth*x,
    y:UIData.inst.CellWidth*y
  }
}


/**
 * 点击位置转换成坐标
 * @param touchX 点击位置横坐标
 * @param touchY 点击位置横坐标
 * @returns 坐标
 */
export const positionToCoord = (touchX:number,touchY:number) => {

  return {
    x:Math.floor(touchX/UIData.inst.CellWidth),
    y:Math.floor(touchY/UIData.inst.CellWidth)
  }
}





export const getAroundCell = (cell:Cell) => {
  const {coord:{x,y}} = cell
  return [
    MapData.inst.getCell(x,y+1), //上
    MapData.inst.getCell(x,y-1), //下
    MapData.inst.getCell(x-1,y), //左
    MapData.inst.getCell(x+1,y), //右
  ].filter(el=>el && el.elimination)
}

/**
 * 找出对应消除物
 * @param x 
 * @param y 
 * @param limitNumber 最大找多少个消除物 
 * @returns 
 */
export const findEliminateTree = (x:number,y:number,limitNumber:number=Infinity) => {

  const _cell = MapData.inst.getCell(x,y);
  if(!_cell?.elimination) {
    return null
  }

  const {elimination} = _cell;

  const {kindId} = elimination;
 

  const recursionList:Cell[] = [];
  const treeSet:Set<Cell> = new Set();
  recursionList.push(_cell);
  treeSet.add(_cell);
 
  while(recursionList.length) {
    const _cell = recursionList[0];

    const round = getAroundCell(_cell).filter(el=> 
      el.elimination.kindId === kindId &&
      !treeSet.has(el)
    );
   
    for (let index = 0; index < round.length; index++) {
      const element = round[index];
      treeSet.add(element);
      recursionList.push(element);
      if(treeSet.size>=limitNumber) {
        recursionList.length = 0;
        break;
      }
    }
    recursionList.shift();
  }

  return treeSet
}


/**
 * 获取能够消除的节点
 */
export const getAbleElimateTree = ()=> {
  for (let i = 0; i < AXLE_SIZE; i++) {
    for (let j = 0; j < AXLE_SIZE; j++) {
      const ableTree = findEliminateTree(i,j,2)
      if(ableTree && ableTree.size>=2) {
        return ableTree
      }
    }
  }

  return null
}


export const createBomb = (pos:Vec3) => {
  const node = Bomb.inst.createBomb();  
  node.setPosition(pos)     
  node.setParent(UINode.inst.eliminationContainer)
}


/**
 * 实现消除
 */
export const eliminateExe = (cellSet: Set<Cell> | null)=> {
  return new Promise(function(res,rej) {
    try {
      let num = 0;
      if(cellSet?.size>1) {   
        const targetNumber = cellSet.size*5;  
          Array.from(cellSet).forEach((el,index)=>{
              let _delay = index*40;
              el.toggleLight();
              setTimeout(()=>{     
                  Score.inst.showScore(cellSet.size*5,el);
                  el?.destroyCell();
                  createBomb(el.cellCenterPos)
                  num++;
                  if(num === cellSet.size) {
                    res(null)
                  }

              },_delay)
          })
          const {score} = panel_data.getState();
          panel_data.dispatch({score:score+targetNumber*cellSet.size})
         
          Evaluate.inst.show(cellSet.size);
      } else {
        rej('没找到对应节点')
      }
    } catch (error) {
      rej(error)
    }
        
  })
}

/**
 * 消除物下落
 */
export const eliminateFall = () => {

  for (let i = 0; i < AXLE_SIZE; i++) {
    let exeList:Cell[] = [];
    for (let j = 0; j < AXLE_SIZE; j++) {
      const cell = MapData.inst.grid[j][i];
      if(!cell.elimination) {
        exeList.push(cell);
      } else {
        if(exeList.length) {
            const targetCell = exeList.shift();
            targetCell.elimination = cell.elimination;
            cell.elimination = null;
            exeList.push(cell);
        }
      }      
    }
  }
}




  /**
   * 遍历
   * @param fn 
   */
  export const forEachCell = (fn:(inst:Cell)=>void)=> {
    for (let i = 0; i < AXLE_SIZE; i++) {
      for (let j = 0; j < AXLE_SIZE; j++) {
        const cell = MapData.inst.grid[j][i];
        fn(cell);
      }
    }
  }

/**
 * 消除物更新下落位置
 */
export const eliminateUpdatePos = (speed:number=2500) => {
  const promiseList:Promise<Cell>[] = []
  forEachCell((cell)=>{
    const {elimination,cellPos} = cell;
    if(elimination && (cellPos.y !== elimination.node.position.y || cellPos.x !== elimination.node.position.x)) {
      const gap = Math.abs(elimination.node.position.y - cellPos.y) || Math.abs(elimination.node.position.x - cellPos.x)
      const duration = gap / speed;
      promiseList.push(
        new Promise((res,rej)=>{
          tween( elimination.node ).to( duration , { position : cell.cellPos } ).call(()=>{
            res(cell)
           } ).start() ;
        })
      )
    }
  })

  return Promise.all(promiseList)

}


export const rnd = ( minNum : number , maxNum : number ) => 
{
    return parseInt( Math.random()*(maxNum-minNum+1)+minNum + "" ,10); 
}

/**坐标转换成单元格位置 */
export const getCellPos = (x,y)=> {
  const _pos = coordToPosition(x,y);
  return new Vec3(_pos.x,_pos.y);
}

/**合并位置调整 */
export const merge = () => {
  /**获取底层 */
  const bottomCell = MapData.inst.grid[0];
  const viewList:number[] = []
  for (let i = 0; i < bottomCell.length; i++) {
    const cell = bottomCell[i];
    if(!cell.elimination) {
      viewList.push(cell.coord.x);
    } else {
      if(viewList.length) {
        const x = viewList.shift()
        for (let j = 0; j < AXLE_SIZE; j++) {
          MapData.inst.grid[j][x].elimination = MapData.inst.grid[j][i].elimination;
          MapData.inst.grid[j][i].elimination = null;
        }
        viewList.push(i)
      }
    }

  }

}


export type ResProps = {
  path:string,
  type: typeof Asset,
  cb:(data:Asset[],name:string)=>void
}

export const resLoad = ({path,cb,type=SpriteFrame}:ResProps) => {
  return new Promise((res,rej)=>{
    resources.loadDir(path,type,(err,data)=>{
        if(!err) {
            res(data)
            cb(data,path);
        }
    }) 
})
}


export const spriteFrameLoad = async (path:string,cb:(data:SpriteFrame[],name:string)=>void ) => {

  return new Promise((res,rej)=>{
      resources.loadDir(path,SpriteFrame,(err,data)=>{
          if(!err) {
              res(data)
              cb(data,path);
          }
      }) 
  })
}


export const audioLoad = async (path:string,cb:(data:AudioClip[],name:string)=>void) => {

  return new Promise((res)=>{
      resources.loadDir(path,AudioClip,(err,data)=>{
          if(!err) {
              res(data)
              cb(data,path);
          }
      }) 
  })
}



export const getNumberFromString = (a: string) => {
  let num = Number(a.replace(/[^0-9]/gi, ''))
  return num ? num : 0
}




/**下一个关卡 */
export const nextLevel = () => {


  panel_data.dispatch({level:panel_data.getState().level+1})
  PanelEntry.inst.controller.initPassNodeStatus()
  MapData.inst.initGameMap();
}




