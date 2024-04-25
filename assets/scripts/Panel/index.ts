import Singleton from "../../base/singleton";
import { LEVEL } from "../Level";
import { Controller } from "./Controller";
import { State } from "./State";
import {panel_data} from './State'



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
        panel_data.subscribe(this.stateChange.bind(this))
    }


    stateChange(value:State,oldVal:State) {
        this.controller.score_view_rolling(value.score,oldVal?.score)
        this.controller.progess_bar_change()
        this.controller.target_tip_change()
        this.controller.pass()
        this.controller.target_score_change();
    }

}