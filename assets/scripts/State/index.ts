import Singleton from "../../base/singleton";




export class State extends Singleton {

  static get inst() {
    return super.getInstance<State>()
  }

  /**是否能点击 */
  ableClick:boolean = true;



}