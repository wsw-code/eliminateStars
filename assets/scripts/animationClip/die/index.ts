

import { animation, AnimationClip, Sprite, SpriteFrame, Vec3 } from "cc";
import Singleton from "../../../base/singleton";



// export const lightAnimationClip = animationClip

import { Dir, NodeName } from "../../../enum";
import { UIData } from "../../uidata";
import { getNumberFromString } from "../../../utils";



export class DieClip extends Singleton {

    static get inst(){
        return super.getInstance<DieClip>()
    }

    animationClip:AnimationClip = null;

    get duration() {
        return this.spriteFrameList.length*this.speed
    }

    get spriteFrameList() {
        return Array.from(UIData.inst.spriteMap.get(Dir.eliminateDie).values())  
    }

    /**帧数 */
    frames:number = 15;
   
    track:animation.ObjectTrack<SpriteFrame>

    speed:number = 0.02


    constructor() {
        super();
        this.animationClip = new AnimationClip();
        this.track = new animation.ObjectTrack()
        this.track.path =  new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame')
        const frames:Array<[number, SpriteFrame]> = this.spriteFrameList.sort((a,b)=>getNumberFromString(a.name)-getNumberFromString(b.name)).map((el, index) => {
            return [this.speed * index, el]
        });
        this.track.channel.curve.assignSorted(frames)
        this.animationClip.addTrack(this.track);
        this.animationClip.wrapMode = AnimationClip.WrapMode.Normal;
        this.animationClip.duration = this.duration; 

    }

}