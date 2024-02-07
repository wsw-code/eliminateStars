
import {Vec3,Size,tween} from 'cc'
import Singleton from '../../base/singleton';
import { ColorType } from "../../types";
import { UIData } from '../uidata';
import {AXLE_SIZE} from '../../state';
import {  rnd } from '../../utils';
import {Cell} from '../Cell'


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
    let delay = 0;
    for (let y = 0; y < AXLE_SIZE; y++) {
      this.grid.push([]);
      for (let x = 0; x < AXLE_SIZE; x++) {
        const cell = new Cell({x,y},this.colorList[this.getRandomColor()]);
        this.grid[y].push(cell);
        this.executeFall(cell,delay)
      }
      delay += 0.09
    }
    
  }

  /**
   * 游戏开始时，消除物下落逻辑
   * @param cell 消除物实例
   * @param delay 延迟时间
   */
  executeFall(cell:Cell,delay:number) {
    const node = cell.cellNode;
    const fallEndY = cell.cellPos.y;
    const duration = ( UIData.inst.fallStartY - fallEndY ) / this.fallSpeed;
    const  r = rnd( 0 , 400 ) * 0.001 ;  
    node.setPosition(new Vec3( cell.cellPos.x , UIData.inst.fallStartY));
    tween( node ).delay( delay + r ).to( duration , { position : cell.cellPos } ).call( ()=>{
      console.log('完成下落');
      cell.playFall();
     } ).start() ; 
  }

}