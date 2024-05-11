import { _decorator, Component, find, Node } from 'cc';
import { UINode } from '../../UiNode';
import { AudioRes } from '../AudioRes';
import { MapData } from '../Mapdata';
import { panel_data } from '../Panel/State';
import { closePupop } from '../Popup';
import {global_state,State} from '../GlobalState/State';
import { LOCAL_STORAGE } from '../../enum';


const { ccclass, property } = _decorator;

@ccclass('SettingPopup')
export class SettingPopup extends Component {


    continueBtn:Node = null

    unsubscribe:()=>void;

    protected onLoad(): void {

        this.initNode();
        this.initEvents();

        this.unsubscribe = global_state.subscribe(this.subscribeFn.bind(this))
    }

    protected onDestroy(): void {
        this.unsubscribe?.()
    }

    /**初始化节点 */
    initNode() {
        UINode.inst.soundBtn = find('container/Audio/Sound',this.node);
        UINode.inst.musicBtn = find('container/Audio/Music',this.node);
        UINode.inst.musicBtnOff = find('container/Audio/Music/Off',this.node);
        UINode.inst.soundBtnOff = find('container/Audio/Sound/Off',this.node);
        UINode.inst.newBtn = find('container/newGame',this.node);
        this.continueBtn = find('container/Continue',this.node);
    }

    subscribeFn({ableSound,ableMusic}:State) {
        localStorage.setItem(LOCAL_STORAGE.SOUND_CONFIG,JSON.stringify({ableSound,ableMusic}));
        UINode.inst.musicBtnOff.active = !ableMusic
        UINode.inst.soundBtnOff.active = !ableSound
    }






    /**
     * 初始化事件
     */
    initEvents() {

        UINode.inst.soundBtn.on(Node.EventType.TOUCH_START,()=>{
            const {ableSound} = global_state.getState();
            global_state.dispatch({ableSound:!ableSound})

        });
        UINode.inst.musicBtn.on(Node.EventType.TOUCH_START,()=>{
            AudioRes.inst.playBtnSound();
            const {ableMusic} = global_state.getState();
            global_state.dispatch({ableMusic:!ableMusic})

        });

        UINode.inst.newBtn.on(Node.EventType.TOUCH_START,()=>{
            closePupop(this.node)
            MapData.inst.initGameMap();
            panel_data.dispatch({score:0})

        })

        this.continueBtn.on(Node.EventType.TOUCH_START,()=>{
            closePupop(this.node)
        })

        
    }


}


