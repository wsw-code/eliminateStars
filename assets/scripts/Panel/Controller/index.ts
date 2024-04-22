import { Component, Label, Sprite, tween,Node, Vec3, UITransform } from "cc"
import Singleton from "../../../base/singleton"
import { View } from "../View"
import { State } from "../State";
import { UIData } from "../../uidata";
import { CommonSprite, Dir } from "../../../enum";
import { UINode } from "../../../ui-node";

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
        View.inst.score_node.getComponent(Label).string = String(showNumber);
    }

    
    target_tip_change() {
        const gap =  State.inst.target_score.data - State.inst.score.data;
        let text = gap>0?`通关还差${gap}分`:'恭喜通关';
        View.inst.target_tip.getComponent(Label).string = text;
    }



    target_score_change(val:number) {
        View.inst.target_score.getComponent(Label).string = val+'';
    }


    /**分数进度条变更 */
    progess_bar_change() {
        const sprite = View.inst.progess_bar.getComponent(Sprite);
        const fillRange = (State.inst.score.data-State.inst.crrentScore)/(State.inst.target_score.data-State.inst.crrentScore)
        tween( sprite ).to( 0.5 , { fillRange : Number(fillRange.toFixed(2)) }  ).start() ; 

    }


    /**通关逻辑 */
    pass(num:number) {
        if(num>=State.inst.target_score.data) {
            this.pass_icon_show()
        }
    }

    /**重置通关标识状态 */
    initPassNodeStatus() {
        if(UINode.inst.passNode) {
            UINode.inst.passNode.active = false;
            UINode.inst.passNode.setPosition(0,0)
        }    
    }


    /**通关标识弹出 */
    pass_icon_show(reset:boolean=false) {

        if(!UINode.inst.passNode) {
            const common = UIData.inst.commonSprite;
            const node = new Node();
            const sprite = node.addComponent(Sprite);
            sprite.spriteFrame = common.get(CommonSprite.pass);
            node.setParent(UINode.inst.gameNode);
            UINode.inst.passNode = node;
            this.initPassNodeStatus();
        }
        if(reset) {
            this.initPassNodeStatus();
        }

        UINode.inst.passNode.scale = new Vec3(0.1,0.1,UINode.inst.passNode.position.z)
        let worldPos = UINode.inst.currentScore.getComponent(UITransform).convertToWorldSpaceAR(Vec3.ZERO);
        let position = UINode.inst.gameNode.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
        const {x,y,z} = position;
        tween(UINode.inst.passNode)
        .to(0.1,{
            scale:new Vec3(1,1,UINode.inst.passNode.position.z)
        })
        .delay(0.1)
        .to(0.1,{
            position:new Vec3(x,y-50,z),
            scale:new Vec3(0.5,0.5,UINode.inst.passNode.position.z)
        })
        .start();

    }



}