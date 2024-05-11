import { AudioClip, AudioSource,Node } from "cc"
import Singleton from "../../base/singleton"

import { global_state} from "../GlobalState/State"
import { AudioPath } from "../../enum"








export class AudioRes extends Singleton {
    static get inst() {
        return super.getInstance<AudioRes>()
    } 

    audioMap:Map<string,AudioClip> = new Map()

    audioPlayerMap:Map<string,Node> = new Map()
    

    constructor() {
        super();
    }






    saveAudioMap(res:AudioClip[]) {
        res.forEach(el=>{
            this.audioMap.set(el.name,el)
        })

    }

    /**播放按键声音 */
    playBtnSound() {
        AudioRes.inst.play(AudioPath.btnClick)
    }

    /**播放背景音乐 */
    playBgm() {
        AudioRes.inst.play(AudioPath.bgm);
    }

    /**
     * 播放音频
     * @param path 音频文件名
     * @param loop 是否循环
     * @returns 
     */
    play(path:string,loop:boolean = false){
        if(!global_state.getState().ableSound) {
            return 
        }
        const clip = this.audioMap.get(path);
        if(!clip) {
            console.log(`没找打对应音频:${path}`)
            return 
        }


    
        const node = new Node(path);
        const audioPlayer = node.addComponent(AudioSource);
        audioPlayer.clip = clip;
        audioPlayer.loop = loop
        audioPlayer.play();

        if(!this.audioPlayerMap.get(path)) {
            this.audioPlayerMap.set(path,node)
        }

        if(!loop) {
            setTimeout(()=>{
                node?.destroy()
            },audioPlayer.duration)
        }
        
        return audioPlayer
    }
    stop(path:string) {
        const node = this.audioPlayerMap.get(path)
        if(node) {
   
            const audioPlayer = node.getComponent(AudioSource);
            audioPlayer.stop()
            node.destroy();
            this.audioPlayerMap.delete(path)
         
        }
    }
}