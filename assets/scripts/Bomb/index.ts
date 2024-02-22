import { Node, Sprite, UITransform,Animation } from "cc";
import Singleton from "../../base/singleton";
import { DieClip } from "../animationClip/die";




export class Bomb extends Singleton {

    static get inst(){
        return super.getInstance<Bomb>()
    }



    animationComponent:Animation

    constructor() {
        super();
    }

    createBomb() {
        const node = new Node('Bomb');
        const transform = node.addComponent(UITransform);
        node.addComponent(Sprite);
        transform.width = 100;
        transform.height = 100;
        this.animationComponent = node.addComponent(Animation);
        this.animationComponent.defaultClip = DieClip.inst.animationClip;
        
        this.animationComponent.on(Animation.EventType.FINISHED,()=>{
            console.log('destory')
            node?.destroy();
        })

        this.animationComponent.playOnLoad = true

        return node;
    }


    

}