import { _decorator,NodeEventType,Vec2 } from 'cc';
import { UINode } from '../../../ui-node';
import Singleton from '../../../base/singleton';
import { eliminateExe, eliminateFall, eliminateUpdatePos, findEliminateTree, positionToCoord,merge } from '../../../utils';
import { State } from '../../State';
const { ccclass, property } = _decorator;

/**
 * 触摸事件
 */
@ccclass('TouchCrtl')
export class TouchCrtl extends Singleton  {
    static get inst() {
        return super.getInstance<TouchCrtl>()
    }
    public pt:Vec2 = new Vec2()

    initTouch() {

        UINode.inst.eliminationContainer.on(NodeEventType.TOUCH_START,async (e)=>{
            if(!State.inst.ableClick) return ;
            State.inst.ableClick = false;
            e.touch.getUILocation( this.pt );
            const {x,y} = positionToCoord(this.pt.x,this.pt.y);
            const tree = findEliminateTree(x,y);
            if(tree && tree.size>=2) {
                await eliminateExe(tree);
                eliminateFall();
                const cellList = await eliminateUpdatePos();
                await Promise.all(cellList.map(el=>el.playFall()))
                merge();  
                await eliminateUpdatePos(3000);
            }
            State.inst.ableClick = true;
        })
    }


}



