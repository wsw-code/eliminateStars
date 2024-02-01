
import {Vec2,Node,Size} from 'cc'
import Singleton from '../../base/singleton';



export class Cell {

  // /**消除物坐标 */
  // coord:Vec2;
  // /**消除物节点 */
  elimination:Node | null;

  /**单元格位置 */
  cellPos:Vec2;


  constructor(
    public coord:Vec2,
  ) {}

    



}




export class MapData extends Singleton {

  static get inst(){
    return super.getInstance<MapData>()
}

  // 数据网格
  public grid = new Array< Array< Cell > >() ;

  // 地图大小
  public size = new Size();





}