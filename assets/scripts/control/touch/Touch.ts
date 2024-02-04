import { _decorator, Component, Node,NodeEventType,Vec2 } from 'cc';
import { UINode } from '../../../ui-node';
import Singleton from '../../../base/singleton';
import { eliminateExe, findEliminateTree, positionToCoord } from '../../../utils';
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

        UINode.inst.eliminationContainer.on(NodeEventType.TOUCH_START,(e)=>{
            e.touch.getUILocation( this.pt );
            const {x,y} = positionToCoord(this.pt.x,this.pt.y);
            const _tree = findEliminateTree(x,y)
            eliminateExe(_tree)
        })
    }


}



