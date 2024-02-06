
import {Vec3,Node,Size, SpriteFrame,UITransform,Layers, Sprite, tween} from 'cc'
import Singleton from '../../base/singleton';
import { ColorType } from "../../types";
import { UIData } from '../uidata';
import {AXLE_SIZE} from '../../state';
import { UINode } from '../../ui-node';
import { coordToPosition, rnd } from '../../utils';
import { NodeName, PathString } from '../../enum';







export class Cell {

  // /**消除物坐标 */
  // coord:Vec2;
  // /**消除物节点 */
  elimination:Node | null;

  /**消除物光圈 */
  lightNode:Node | null; 


  /**消除物 */
  cellNode:Node | null; 


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
    this.createEntireNode();
  }


  initWrapperNode() {
    const node = new Node(NodeName.cellWrapper)
    node.layer = 1 << Layers.nameToLayer('UI_2D');
    node.setPosition(this.cellPos)
    this.setCommonUITransform(node);
    return node;
  }

  createEntireNode() {
    this.elimination = this.initWrapperNode();
    this.cellNode = this.createCellNode();
    this.lightNode = this.createLightNode();
    this.cellNode.setParent(this.elimination);
    this.lightNode.setParent(this.elimination);
    this.elimination.setParent(UINode.inst.eliminationContainer);
  }

  toggleLight() {
    this.lightNode.active = !this.lightNode.active
  }

  createLightNode() {
    const node = new Node(NodeName.light)
    const sprite = node.addComponent(Sprite);
    sprite.spriteFrame = UIData.inst.spriteMap.get(PathString.block_light_hd)
    node.active = false;
    node.layer = 1 << Layers.nameToLayer('UI_2D');
    this.setCommonUITransform(node);
    return node;
  }


  createCellNode() {
    const node = new Node(NodeName.cell)
    const sprite = node.addComponent(Sprite);
    sprite.spriteFrame = UIData.inst.spriteMap.get(this.id)
    node.layer = 1 << Layers.nameToLayer('UI_2D');
    this.setCommonUITransform(node);
    return node
  }


  setCommonUITransform(node:Node) {
    const transform = node.addComponent(UITransform);
    transform.width = UIData.inst.CellWidth;
    transform.height = UIData.inst.CellWidth;
    transform.setAnchorPoint(0,0);
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
    const node = cell.elimination;
    const fallEndY = cell.cellPos.y;
    const duration = ( UIData.inst.fallStartY - fallEndY ) / this.fallSpeed;
    const  r = rnd( 0 , 400 ) * 0.001 ;  
    node.setPosition(new Vec3( cell.cellPos.x , UIData.inst.fallStartY));
    tween( node ).delay( delay + r ).to( duration , { position : cell.cellPos } ).call( ()=>{
      console.log('完成下落')
     } ).start() ; 
  }




}