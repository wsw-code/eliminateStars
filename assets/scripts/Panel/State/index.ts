
import { createStore } from "../../../base/redux";
import Singleton from "../../../base/singleton"; 
import { Stateton } from "../../../base/stateton";

import {LEVEL} from '../../Level'




export class State extends Singleton {
    static get inst() {
        return super.getInstance<State>()
    }

    currentScore:number = 0;

    /**当前关卡索引 */
    level:number = 0;

    /**面板分数 */
    score: number = 0;

    /** 目标分数 */
    get target_score() {
        return this.currentLevel.score
    }



    /**获取当前关卡数据 */
    get currentLevel() {
        return LEVEL[this.level]
    }

    /**判断是否通关 */
    get isPass() {
        return this.score >= this.target_score
    }

}



export const panel_data = createStore(State.inst);

