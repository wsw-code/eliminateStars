import { _decorator,NodeEventType,Vec2 } from 'cc';
import { UINode } from '../../../ui-node';
import Singleton from '../../../base/singleton';
import { eliminateExe, eliminateFall, eliminateUpdatePos, findEliminateTree, positionToCoord,merge, getAbleElimateTree, nextLevel, LOCAL_DATA_FOR_USER, record_score } from '../../../utils';
import { State } from '../../State';
import {panel_data} from '../../Panel/State'
import {PanelEntry} from '../../Panel'
import { PopupControl } from '../../PopupControl';
import { AudioRes } from '../../AudioRes';
import { AudioPath, LOCAL_STORAGE } from '../../../enum';
const { ccclass } = _decorator;

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
                const ableElimateTree = getAbleElimateTree();
                const {isPass} = panel_data.getState();
                record_score()
                

                /**已达通关条件 */
                if(isPass) {
                    console.log('弹出Pass ICON')
                    PanelEntry.inst.controller.pass_icon_show();
                }

                if(!ableElimateTree ) {
                    console.log('不能再消除了')
          
                    if(isPass) {
                        console.log('通关')
                        PopupControl.inst.showSuccess();
                        AudioRes.inst.play(AudioPath.combo_3)
                    } else {
                        PopupControl.inst.showFail();
                  
                        console.log('失败')
                    }
                     
                }
            }
            State.inst.ableClick = true;
        })
    }


    


    


}



