

import Singleton from "../../base/singleton"; 
import { AudioPath, LOCAL_STORAGE } from "../../enum";
import { AudioRes } from "../AudioRes";

import {global_state,State} from './State'




export default class GlobalState extends Singleton {
    static get inst() {
        return super.getInstance<GlobalState>()
    }

    init() {
      global_state.subscribe(this.soundChange.bind(this));
      
    }

    soundChange({ableSound,ableMusic}:State) {

      if(ableSound) {
          AudioRes.inst.playBtnSound();
      }

      if(ableMusic) {
          AudioRes.inst.play(AudioPath.bgm,true)
      } else {
          AudioRes.inst.stop(AudioPath.bgm)
      }

  }



}





