
import Singleton from "../../base/singleton";
import { AudioPath } from "../../enum";
import { UINode } from "../../ui-node";
import { AudioRes } from "../AudioRes";




export class State extends Singleton {

  static get inst() {
    return super.getInstance<State>()
  }

  /**是否能点击 */
  ableClick:boolean = true;



  /**按钮点击声音 */
  _ableSound:boolean = true;

  get ableSound() {
    return this._ableSound;
  }

  set ableSound(val:boolean) {
    this._ableSound = val;
    UINode.inst.soundBtnOff.active = !val;
  }


    /**按钮点击声音 */
    _ableMusic:boolean = true;

    get ableMusic() {
      return this._ableMusic;
    }
    /**背景音乐声音 */
    set ableMusic(val:boolean) {
      this._ableMusic = val;
      UINode.inst.musicBtnOff.active = val;
      // if(!val) {
      //   AudioRes.inst.play(AudioPath.bgm,true)
      // } else {
      //   AudioRes.inst.stop(AudioPath.bgm)
      // }
    }

 




}