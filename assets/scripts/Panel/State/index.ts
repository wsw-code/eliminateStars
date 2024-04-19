
import Singleton from "../../../base/singleton"; 
import { Stateton } from "../../../base/stateton";

import {LEVEL} from '../../Level'





export class State extends Singleton {


    static get inst() {
        return super.getInstance<State>()
    }

    /**当前关卡 */
    get level() {
        return this._level;
    }


    set level(val:number) {
        this._level = val;
        this.target_score.data = LEVEL[this.level].score
    }

    _level:number = 0;

     

    /**获取当前关卡数据 */
    get currentLevel() {
        return LEVEL[this.level]
    }

    /** 目标分数 */
    target_score: Stateton<number> = new Stateton(this.currentLevel.score);

    /**面板分数 */
    score: Stateton<number> = new Stateton(0);

    get gap() {
        return this.target_score
    }

    /**判断是否通关 */
    get isPass() {
        return this.score >= this.target_score
    }
}