import Singleton from "../../base/singleton";




export class State extends Singleton {

  static get inst() {
    return super.getInstance<State>()
  }

  /**是否能点击 */
  ableClick:boolean = true;

  /**按钮点击声音 */
  ableSound:boolean = true;

  /**背景音乐声音 */
  ableMusic:boolean = false;

}