

import { animation, AnimationClip, Vec3 } from "cc";
import Singleton from "../../../base/singleton";



// export const lightAnimationClip = animationClip

import { NodeName } from "../../../enum";

export class FallClip extends Singleton {

    static get inst(){
        return super.getInstance<FallClip>()
    }

    animationClip:AnimationClip = null;

    duration:number = 0.25;

    /**帧数 */
    frames:number = 15;
   
    track:animation.SizeTrack

    keyFrames:{
        time:number,
        value:{x:number,y:number}
    }[]

    constructor() {
        super();
        this.animationClip = new AnimationClip();
        this.track = new animation.SizeTrack();
        this.track.path = new animation.TrackPath().toHierarchy(NodeName.star).toProperty('scale');
        const [x, y] = this.track.channels(); // x, y 是前两条通道
        this.keyFrames = this.createFrames();
        x.curve.assignSorted(this.keyFrames.map(({time,value}) => [time,{'value':value.x}]));
        y.curve.assignSorted(this.keyFrames.map(({time,value}) => [time,{'value':value.y}]));
        this.animationClip.addTrack(this.track);
        this.animationClip.duration = this.duration;    
    }


    createFrames() {
        const _timeforFrames = Number((this.duration/this.frames).toFixed(2))
        return [
            {
                time:0,
                value:{
                    x:1,
                    y:1
                }
            },
            {
                time:_timeforFrames*4,
                value:{
                    x:1.1,
                    y:0.9
                }
            },
            {
                time:this.duration,
                value:{
                    x:1,
                    y:1
                }
            },
        ]
    }


}