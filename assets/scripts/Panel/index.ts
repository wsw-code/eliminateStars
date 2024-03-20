import Singleton from "../../base/singleton";
import { Controller } from "./Controller";
import { State } from "./State";
import { View } from "./View";





export class PanelEntry extends Singleton {

    static get inst() {
        return super.getInstance<PanelEntry>()
    }

    controller:Controller = new Controller()

    constructor() {
        super();
 
    }


    init() {
        this.score_bind()
    }

    /**得分面板视图绑定 */
    score_bind() {

        State.inst.score.registerEvents([
            this.controller.score_view_rolling.bind(this.controller),
        ])

    }






}