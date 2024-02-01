import Singleton from "../../base/singleton";

import {SpriteFrame} from 'cc'
import { ColorType } from "../../types";
export class UIData extends Singleton {

  static get inst(){
    return super.getInstance<UIData>()
}

  /**消除物颜色 */
  public eliminationMap:Record<`${ColorType}`,SpriteFrame | null> = {
    [ColorType.RED]:null,
    [ColorType.BLUE]:null,
    [ColorType.GREEN]:null,
    [ColorType.YELLOW]:null,
    [ColorType.PURPLE]:null,
  }



}