

import { animation, AnimationClip, Vec3 } from "cc";
import Singleton from "../../../base/singleton";



// export const lightAnimationClip = animationClip

import { NodeName } from "../../../enum";

export class lightAnimationClip extends Singleton {

    static get inst(){
        return super.getInstance<lightAnimationClip>()
    }

    animationClip:AnimationClip = null;

    duration:number = 0;

    track:animation.ObjectTrack<boolean>

    keyFrames:{
        time:number,
        value:boolean
    }[]

    constructor() {
        super();
        this.animationClip = new AnimationClip();
        this.track = new animation.ObjectTrack<boolean>();
        this.track.path = new animation.TrackPath().toHierarchy(NodeName.light).toProperty('active');
        this.keyFrames = this.createFrames();
        this.track.channel.curve.assignSorted(this.keyFrames.map(({time,value}) => [time,value]));
        this.animationClip.addTrack(this.track);
        this.animationClip.wrapMode = AnimationClip.WrapMode.Loop;
        this.animationClip.duration = 0.4
    }


    createFrames() {
        return [
            {
                time:0,
                value:false
            },
            {
                time:0.2,
                value:true
            },
            {
                time:0.4,
                value:false
            },
        ]
    }


}