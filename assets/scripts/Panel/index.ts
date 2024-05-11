import { Label,Node } from "cc";
import Singleton from "../../base/singleton";
import { GLOBAL_EVENTS, PrefabPath } from "../../enum";
import { UINode } from "../../UiNode";

import { Controller } from "./Controller";
import { State } from "./State";
import {panel_data} from './State'
import { View } from "./View";
import { AudioRes } from "../AudioRes";
import { PopupControl } from "../PopupControl";
import { PrefabRes } from "../Prefabs";




/**顶部面板 */
export class PanelEntry extends Singleton {

    static get inst() {
        return super.getInstance<PanelEntry>()
    }

    controller:Controller = new Controller()

    constructor() {
        super();
 
    }

    init() {
        panel_data.subscribe(this.stateChange.bind(this));
        this.listen();
        this.initEvents();

    }

    initEvents() {
        UINode.inst.settingBtn.on(Node.EventType.TOUCH_END,()=>{
            AudioRes.inst.playBtnSound();
            PopupControl.inst.show(PrefabRes.inst.prefabMap.get(PrefabPath.Setting));
        })
    }

    stateChange(value:State,oldVal:State) {
        this.controller.score_view_rolling(value.score,oldVal?.score)
        this.controller.progess_bar_change()
        this.controller.target_tip_change()
        this.controller.pass()
        this.controller.target_score_change();
        this.controller.current_level_show();
    }


    listen() {
        UINode.inst.globalEventNode.on(GLOBAL_EVENTS.GET_RECORD,(num:number)=>{
            if(num) {
                View.inst.record_num_container.active = true;
                View.inst.record_num.getComponent(Label).string = num+''
            }
            
        })
    }

}