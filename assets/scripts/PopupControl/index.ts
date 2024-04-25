import Singleton from "../../base/singleton";
import { Prefab} from 'cc';
import { Popup,ConfigProps } from "../Popup";
import { PrefabRes } from "../Prefabs";
import { PrefabPath } from "../../enum";
import { Dialog } from "../Dialog";
import { nextLevel } from "../../utils";



 

export class PopupControl extends Singleton {

    static get inst() {
        return super.getInstance<PopupControl>()
    }
    popupMap:Map<Prefab,Popup> = new Map();

    show(prefab:Prefab,config:ConfigProps={}) {
        let popupInst = this.popupMap.get(prefab);
        if(popupInst) {
            popupInst.show()
        } else {
            popupInst = new Popup(prefab,config);
            this.popupMap.set(prefab,popupInst);
        }

        return popupInst
    }


    showSuccess() {
       PopupControl.inst.show(PrefabRes.inst.prefabMap.get(PrefabPath.Dialog),{
        callBackFn:nextLevel
       });
    }
}