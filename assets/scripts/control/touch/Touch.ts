import { _decorator, Component, Node,NodeEventType,Vec2 } from 'cc';
import { UINode } from '../../../ui-node';
import Singleton from '../../../base/singleton';
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
            console.log(e);

            e.touch.getUILocation( this.pt ) ;

            console.log(this.pt)
        })
    }


}


