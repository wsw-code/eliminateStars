import Singleton from "../../base/singleton";
import { Controller } from "./Controller";
import { State } from "./State";





export class PanelEntry extends Singleton {

    static get inst() {
        return super.getInstance<PanelEntry>()
    }

    controller:Controller = new Controller()

    constructor() {
        super();
 
    }


    init() {
        this.score_bind();
        this.target_score_bind();
    }

    /**得分面板视图绑定 */
    score_bind() {

        State.inst.score.registerEvents([
            this.controller.score_view_rolling.bind(this.controller),
            this.controller.progess_bar_change.bind(this.controller),
            this.controller.target_tip_change.bind(this.controller)
        ])


    }


    target_score_bind() {
        State.inst.target_score.registerEvents([
            this.controller.target_score_change.bind(this.controller),
        ]) 
        State.inst.target_score.data = State.inst.target_score.data

    }

    






}