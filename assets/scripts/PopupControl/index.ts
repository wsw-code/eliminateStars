import Singleton from "../../base/singleton";
import { Prefab} from 'cc';
import { Popup } from "../Popup";
import { PrefabRes } from "../Prefabs";
import { PrefabPath } from "../../enum";
import { Dialog } from "../Dialog";



 

export class PopupControl extends Singleton {

    static get inst() {
        return super.getInstance<PopupControl>()
    }
    popupMap:Map<Prefab,Popup> = new Map();

    show(prefab:Prefab) {
        let popupInst = this.popupMap.get(prefab);
        if(popupInst) {
            popupInst.show()
        } else {
            popupInst = new Popup(prefab);
            this.popupMap.set(prefab,popupInst);
        }

        return popupInst
    }


    showSuccess() {
       PopupControl.inst.show(PrefabRes.inst.prefabMap.get(PrefabPath.Dialog));
    }
}