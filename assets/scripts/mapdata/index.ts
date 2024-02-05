
import {Vec3,Node,Size, SpriteFrame,UITransform,Layers, Sprite} from 'cc'
import Singleton from '../../base/singleton';
import { ColorType } from "../../types";
import { UIData } from '../uidata';
import {AXLE_SIZE} from '../../state';
import { UINode } from '../../ui-node';
import { coordToPosition } from '../../utils';







export class Cell {

  // /**消除物坐标 */
  // coord:Vec2;
  // /**消除物节点 */
  elimination:Node | null;

  
  


  /**坐标转换成单元格位置 */
  get cellPos() {
    const _pos = coordToPosition(this.coord.x,this.coord.y);
    return new Vec3(_pos.x,_pos.y);
  }

  constructor(
    public coord:{
      x:number,
      y:number
    },
    public id:`${ColorType}`
  ) {
    this.elimination = this.createNode();
  }




  createNode() {
    const node = new Node(this.id)
    const transform = node.addComponent(UITransform);
    const sprite = node.addComponent(Sprite);
    sprite.spriteFrame = UIData.inst.spriteMap.get(this.id)
    node.layer = 1 << Layers.nameToLayer('UI_2D');
    node.setPosition(this.cellPos)
    transform.width = UIData.inst.CellWidth;
    transform.height = UIData.inst.CellWidth;
    transform.setAnchorPoint(0,0)
    node.setParent(UINode.inst.eliminationContainer);
    return node
  }





}




export class MapData extends Singleton {

  static get inst(){
    return super.getInstance<MapData>()
  }



  public colorList = Object.values(ColorType)
  

  // 数据网格
  public grid = new Array< Array< Cell > >() ;

  // 地图大小
  public size = new Size();


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
        this.grid[y].push(new Cell({x,y},this.colorList[this.getRandomColor()]))
      }
    }


    
  }




}