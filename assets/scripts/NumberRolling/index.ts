import { Component, Label } from "cc";



export class NumberRolling extends Component {


    startNumber:number = 0;


    endNumber:number = 0;


    currentNumber:number = 0;

    duration:number = 0.5;

    scheduleObject = null;

    addNumber:number = 0;

    interval:number = 0.05

    get changeTimes() {
        return Math.ceil(this.duration/this.interval)
    }

    protected onLoad(): void {
        this.startNumber = Number(this.node.getComponent(Label).string);
    }


    rolling(targetNumber:number) {
        this.unschedule(this.scheduleCallback)
        const times = this.duration
        this.addNumber = (targetNumber-this.startNumber)/this.duration


        this.scheduleObject = this.schedule(this.scheduleCallback,this.interval)




    }


    scheduleCallback(dt:number) {
        
    }








}