import { Component, Label, Sprite, tween,Node, Vec3, UITransform } from "cc"

import { View } from "../View"
import { State, panel_data } from "../State";
import { UIData } from "../../uidata";
import { CommonSprite, Dir } from "../../../enum";
import { UINode } from "../../../UiNode";


        


export class Controller extends Component {



    duration:number = 0.2;

    addNumber:number = 0;

    targetNumber:number = 0;

    /**间隔 */
    interval:number = 0.04;

    currentTimes:number = 0;



    get times() {
        return Math.ceil(this.duration/this.interval)
    }


    score_view_change(val:number) {
        View.inst.score_node.getComponent(Label).string = val+''
    }


    score_view_rolling(targetNumber:number,currentNumber:number) {
        if(Number.isNaN(currentNumber)) {
            return 
        }
        this.targetNumber = targetNumber;
        this.unschedule(this.scheduleCallback);
        this.addNumber = Math.ceil((this.targetNumber-currentNumber)/this.times);
        this.currentTimes = 0;
        this.schedule(this.scheduleCallback,this.interval,this.times)
    }


    scheduleCallback() {
        const number = Number(View.inst.score_node.getComponent(Label).string);
        let showNumber = number+this.addNumber;
        this.currentTimes++;
        if(this.currentTimes >= this.times) {
            showNumber = this.targetNumber
        }
        if(!Number.isNaN(showNumber)) {
            View.inst.score_node.getComponent(Label).string = String(showNumber);
        }
        
    }

    
    target_tip_change() {
        const {score,target_score} = panel_data.getState();
        const gap =  target_score - score;
        let text = gap>0?`通关还差${gap}分`:'恭喜通关';
        View.inst.target_tip.getComponent(Label).string = text;
    }



    target_score_change() {
        const {target_score} = panel_data.getState();
        View.inst.target_score.getComponent(Label).string = target_score+'';
    }


    /**分数进度条变更 */
    progess_bar_change() {
        const {score,currentScore,target_score} = panel_data.getState();
        const sprite = View.inst.progess_bar.getComponent(Sprite);
        const fillRange = (score-currentScore)/(target_score-currentScore);
        tween( sprite ).to( 0.5 , { fillRange : Number(fillRange.toFixed(2)) }).start(); 
    }


    /**通关逻辑 */
    pass() {
        const {score,target_score} = panel_data.getState();
        if(score>=target_score) {
            this.pass_icon_show()
        }
    }

    /**重置通关标识状态 */
    initPassNodeStatus() {
       
        if(UINode.inst.passNode) {
            UINode.inst.passNode.active = false;
            UINode.inst.passNode.setPosition(0,0);
        }    
    }


    /**通关标识弹出 */
    pass_icon_show() {
        if(UINode.inst.passNode?.active) {
            return 
        }
        if(!UINode.inst.passNode) {
            const common = UIData.inst.commonSprite;
            const node = new Node();
            const sprite = node.addComponent(Sprite);
            sprite.spriteFrame = common.get(CommonSprite.pass);
            node.setParent(UINode.inst.gameNode);
            UINode.inst.passNode = node;
            this.initPassNodeStatus();
        }


        UINode.inst.passNode.active = true;
        UINode.inst.passNode.scale = new Vec3(0.1,0.1,UINode.inst.passNode.position.z);
        let worldPos = UINode.inst.currentScore.getComponent(UITransform).convertToWorldSpaceAR(Vec3.ZERO);
        let position = UINode.inst.gameNode.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
        const {x,y,z} = position;
        tween(UINode.inst.passNode)
        .to(0.1,{
            scale:new Vec3(1,1,UINode.inst.passNode.position.z)
        })
        .delay(0.3)
        .to(0.1,{
            position:new Vec3(x,y-50,z),
            scale:new Vec3(0.5,0.5,UINode.inst.passNode.position.z)
        })
        .start();

    }

    current_level_show() {
        const {level} = panel_data.getState();
        View.inst.current_level.getComponent(Label).string = (level+1)+'';
    }


    record_num_change() {

        const {recordNum} = panel_data.getState();
        View.inst.record_num.getComponent(Label).string = recordNum+'';
    }

}