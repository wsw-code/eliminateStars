import Singleton from "../../base/singleton";
import { Prefab} from 'cc';
import { Popup } from "../Popup";



 

export class PopupControl extends Singleton {

    static get inst() {
        return super.getInstance<PopupControl>()
    }
    popupMap:Map<Prefab,Popup> = new Map();

    show(prefab:Prefab) {
        console.log('prefab == ',prefab)
        let popupInst = this.popupMap.get(prefab);
        if(popupInst) {
            popupInst.show()
        } else {
            popupInst = new Popup(prefab);
            this.popupMap.set(prefab,popupInst);
        }

        return popupInst
    }
}