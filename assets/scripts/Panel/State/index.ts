
import Singleton from "../../../base/singleton";
import { Stateton } from "../../../base/stateton";






export class State extends Singleton {


    static get inst() {
        return super.getInstance<State>()
    }


    /**面板分数 */
    score: Stateton<number> = new Stateton(0);
}