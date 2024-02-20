
import {Vec3,Size,tween, Node} from 'cc'
import Singleton from '../../base/singleton';
import { ColorType } from "../../types";
import { UIData } from '../uidata';
import {AXLE_SIZE} from '../../state';
import {  forEachCell, rnd } from '../../utils';
import {Cell} from '../Cell'
import { Elimination } from '../Elimination';



export class MapData extends Singleton {

  static get inst(){
    return super.getInstance<MapData>()
  }



  public colorList = Object.values(ColorType)
  


  // 数据网格
  public grid = new Array< Array< Cell > >() ;

  // 地图大小
  public size = new Size();

  /**下落速度 */
  fallSpeed:number = 2500


  getCell(x:number,y:number) {
    if(x>=AXLE_SIZE || y>=AXLE_SIZE || x < 0 || y < 0) {
      return null;
    }
    return MapData.inst.grid[y][x]
  }

  constructor() {
    super();
    
  }





  /**
   * 获取随机颜色
   */
  getRandomColor() {
    return Math.floor(Math.random()*this.colorList.length)
  }


  createMap() {
    for (let y = 0; y < AXLE_SIZE; y++) {
      this.grid.push([]);
      for (let x = 0; x < AXLE_SIZE; x++) {
        const kindId = this.colorList[this.getRandomColor()]
        const cell = new Cell({x,y});
        cell.elimination = new Elimination({x,y},kindId);
        this.grid[y].push(cell);
      }
    }
  }



  /**
   * 游戏开始时，消除物下落逻辑
   * @param cell 消除物实例
   * @param delay 延迟时间
   */
  executeFall() {

    const nodeList = this.grid.flat();
    const promiseArr:Promise<any>[] = [];
    nodeList.forEach((cell,index)=>{
      const node = cell.elimination.node;
      const  r = rnd( 0 , 400 ) * 0.001;  
      const startPos = new Vec3( cell.cellPos.x , UIData.inst.fallStartY);
      const endPos = cell.cellPos;
      node.setPosition(startPos);
      const duration = Math.abs(( endPos.y - startPos.y  )) / this.fallSpeed;
      promiseArr.push((()=>{
        return new Promise((res)=>{
          tween( node ).delay(0.09*Math.floor(index/AXLE_SIZE)+r).to( duration , { position : endPos } ).call( ()=>{
              res('complete')
          } ).start() ;
      })
      })())
    })
    Promise.all(promiseArr)
    .then(()=>{
      console.log('完成下落')
    })



  }

}