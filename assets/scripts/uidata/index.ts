import Singleton from "../../base/singleton";

import {SpriteFrame,UITransform,resources} from 'cc'
import { UINode } from "../../ui-node";
import { AXLE_SIZE } from "../../state";

export class UIData extends Singleton {

  static get inst(){
    return super.getInstance<UIData>()
}


  public get worldWidth() {
    return UINode.inst.gameNode.getComponent(UITransform).width
  }

  public get worldHeight() {
    return UINode.inst.gameNode.getComponent(UITransform).height;
  }

  public get CellWidth() {
    return UINode.inst.gameNode.getComponent(UITransform).width/AXLE_SIZE;
  }



  /**
   * map数据 Map<图片名称，Sprite>
   */
  public spriteMap:Map<string,SpriteFrame> = new Map()

  /**保存sprite数据 */
  saveSpriteMap(list:SpriteFrame[]) {
    list.forEach(el=>{
      this.spriteMap.set(el.name,el)
    })
  }

  

}