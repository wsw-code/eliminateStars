import { AudioClip, AudioSource,Node } from "cc"
import Singleton from "../../base/singleton"
import { UINode } from "../../ui-node"



export class AudioRes extends Singleton {
    static get inst() {
        return super.getInstance<AudioRes>()
    } 

    audioPlayer:AudioSource

    constructor() {
        super()
    }



    audioMap:Map<string,AudioClip> = new Map()

    saveAudioMap(res:AudioClip[]) {
        res.forEach(el=>{
            this.audioMap.set(el.name,el)
        })
    }

    play(path:string){

        const node = new Node();

        const player = node.addComponent(AudioSource);
        const clip = this.audioMap.get(path);
        
        if(clip) {

            player.clip = clip;
            player.play();

            player.node.on(AudioSource.EventType.ENDED, ()=>{
                console.log('结束');
                node?.destroy();
            }, this);
        }

    }
}