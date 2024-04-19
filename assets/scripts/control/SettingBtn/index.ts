import Singleton from "../../../base/singleton";
import { UINode } from "../../../ui-node";
import {Node} from 'cc';
import { State } from "../../State";
import { AudioRes } from "../../AudioRes";
import { AudioPath, PrefabPath } from "../../../enum";
import { PopupControl } from "../../PopupControl";
import { PrefabRes } from "../../Prefabs";


/**
 * 设置按钮逻辑
 */
export class SettingBtn extends Singleton {
    static get inst() {
        return super.getInstance<SettingBtn>()
    }

    init() {

        UINode.inst.settingBtn.on(Node.EventType.TOUCH_END,()=>{
            AudioRes.inst.playBtnSound();

            console.log(1111)
            PopupControl.inst.show(PrefabRes.inst.prefabMap.get(PrefabPath.Setting));
        })


    }
}