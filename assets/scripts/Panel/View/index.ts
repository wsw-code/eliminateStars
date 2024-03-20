import { find,Node } from "cc";
import Singleton from "../../../base/singleton";



export class View extends Singleton {

    static get inst() {
        return super.getInstance<View>()
    }

    /**面板得分节点 */
    score_node:Node = find('Canvas/GameNode/Panel/CurrentScore');

}