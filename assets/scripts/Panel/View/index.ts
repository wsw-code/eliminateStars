import { find,Node } from "cc";
import Singleton from "../../../base/singleton";



export class View extends Singleton {

    static get inst() {
        return super.getInstance<View>()
    }

    /**面板得分节点 */
    score_node:Node = find('Canvas/GameNode/Panel/CurrentScore');

    progess_bar:Node = find('Canvas/GameNode/Panel/Progess/BarContainer/Bar');


    target_score:Node = find('Canvas/GameNode/Panel/Progess/ProgessScore/TargetScore');


    target_tip:Node = find('Canvas/GameNode/Panel/Tip');

    /**关卡显示 节点 */
    current_level:Node = find('Canvas/GameNode/Panel/LevelInfo/Level')


    /**最高记录 节点 */
    record_num:Node = find('Canvas/GameNode/Panel/Record/RecordNum')
    /**最高记录容器 节点 */
    record_num_container:Node = find('Canvas/GameNode/Panel/Record')
}