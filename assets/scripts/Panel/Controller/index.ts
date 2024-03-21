import { Component, Label, Sprite, tween } from "cc"
import Singleton from "../../../base/singleton"
import { View } from "../View"
import { State } from "../State";

export class Controller extends Component {



    duration:number = 0.2;

    addNumber:number = 0;

    targetNumber:number = 0;

    /**间隔 */
    interval:number = 0.04;

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
        console.log(this.addNumber)
        this.schedule(this.scheduleCallback,this.interval)
    }


    scheduleCallback(dt:number) {
        const number = Number(View.inst.score_node.getComponent(Label).string);
        let showNumber = number+this.addNumber;
        if(showNumber>=this.targetNumber) {
            showNumber = this.targetNumber
        }
       
        View.inst.score_node.getComponent(Label).string = String(showNumber);
    }



    target_score_change(val:number) {
        View.inst.target_score.getComponent(Label).string = val+'';
    }



    progess_bar_change(val:number) {
        const sprite = View.inst.progess_bar.getComponent(Sprite);

        const fillRange = val/State.inst.target_score.data

        tween( sprite ).to( 0.5 , { fillRange : Number(fillRange.toFixed(2)) }  ).start() ; 

    }



}