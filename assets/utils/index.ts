
import Singleton from '../base/singleton';
import { UIData } from '../scripts/uidata';
import {  MapData } from '../scripts/mapdata';
import { Cell } from '../scripts/Cell';
import { AXLE_SIZE } from '../state';
import { UITransform, Vec3, tween } from 'cc';
import { Bomb } from '../scripts/Bomb';
import { UINode } from '../ui-node';


export class NodeCreateFactory extends Singleton {

  static 


}


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



export const eliminateControl = (x:number,y:number) => {

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
 * @returns 
 */
export const findEliminateTree = (x:number,y:number) => {

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
    }
    recursionList.shift();
  }

  return treeSet

  


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
          [...cellSet].forEach((el,index)=>{
              let _delay = index*40;
              el.toggleLight();
              setTimeout(()=>{
                  el?.destroyCell();
                  createBomb(el.cellCenterPos)
                  num++;
                  if(num === cellSet.size) {
                    res(null)
                  }

              },_delay)
          })
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
export const eliminateUpdatePos = () => {
  
  forEachCell((cell)=>{

    const {elimination,cellPos} = cell;

    if(elimination && cellPos.y !== elimination.node.position.y) {
      // elimination.node.setPosition(cellPos);
      const duration = ( elimination.node.position.y - cellPos.y ) / 2500;
      tween( elimination.node ).to( duration , { position : cell.cellPos } ).call( ()=>{
        // console.log(node.position.x,node.position.y)
        cell.playFall();
       } ).start() ; 
    }


  })


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