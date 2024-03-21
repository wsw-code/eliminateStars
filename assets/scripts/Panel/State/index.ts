
import Singleton from "../../../base/singleton";
import { Stateton } from "../../../base/stateton";






export class State extends Singleton {


    static get inst() {
        return super.getInstance<State>()
    }

    /** 目标分数 */
    target_score: Stateton<number> = new Stateton(1000);


    /**面板分数 */
    score: Stateton<number> = new Stateton(0);
}