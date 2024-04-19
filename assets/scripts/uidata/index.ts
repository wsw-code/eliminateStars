import Singleton from "../../base/singleton";

import {SpriteFrame,UITransform,resources} from 'cc'
import { UINode } from "../../ui-node";
import { AXLE_SIZE } from "../../state";
import { Dir } from "../../enum";

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

  public get containerWidth() {
    return UINode.inst.eliminationContainer.getComponent(UITransform).width;
  }

  public get CellWidth() {
    return this.containerWidth/AXLE_SIZE;
  }


  public get fallStartY() {
    return this.worldHeight+this.CellWidth;
  }
  
  public get commonSprite() {
    return this.spriteMap.get(Dir.common)
  }



  /**
   * map数据 Map<图片名称，Sprite>
   */
  public spriteMap:Map<string,Map<string,SpriteFrame>> = new Map()

  /**保存sprite数据 */
  saveSpriteMap(list:SpriteFrame[],name:string) {

    if(!this.spriteMap.has(name)) {
      this.spriteMap.set(name,new Map())
    }
    list.forEach(el=>{
      this.spriteMap.get(name).set(el.name,el)
    })

  }

  

}