import { Vec3 } from 'cc'
import Singleton from '../base/singleton';
import { UIData } from '../scripts/uidata';
import { UINode } from '../ui-node';
import { Cell, MapData } from '../scripts/mapdata';




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
  ]
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
  const recursionList:Cell[] = [];
  const treeSet:Set<Cell> = new Set();
  recursionList.push(_cell);
  treeSet.add(_cell);
  const {id} = _cell;
 
  while(recursionList.length) {
    const _cell = recursionList[0];

    const round = getAroundCell(_cell).filter(el=> 
      el && 
      el.id === id &&
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


/**
 * 实现消除
 */
export const eliminateExe = (cellSet: Set<Cell>)=> {

  if(cellSet.size>1) {     
      [...cellSet].forEach((el,index)=>{
          let _delay = index*40;
          el.toggleLight()
          setTimeout(()=>{
              el?.elimination.destroy()
              _delay
          },_delay)
      })
  }
}




export const rnd = ( minNum : number , maxNum : number ) => 
{
    return parseInt( Math.random()*(maxNum-minNum+1)+minNum + "" ,10); 
}