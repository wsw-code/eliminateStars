import { _decorator, Component, find, Node } from 'cc';
import { UINode } from '../../../ui-node';
import { AudioRes } from '../../AudioRes';
import { State } from '../../State';
import { MapData } from '../../mapdata';
import { State as PanelState } from '../../Panel/State';
import { closePupop } from '../../Popup';
const { ccclass, property } = _decorator;

@ccclass('SettingPopup')
export class SettingPopup extends Component {


    continueBtn:Node = null

    protected onLoad(): void {

        this.initNode();
        this.initEvents();

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

    /**
     * 初始化事件
     */
    initEvents() {

        UINode.inst.soundBtn.on(Node.EventType.TOUCH_START,()=>{
            
            State.inst.ableSound = !State.inst.ableSound;
            if(State.inst.ableSound) {
                AudioRes.inst.playBtnSound();
            }
        });
        UINode.inst.musicBtn.on(Node.EventType.TOUCH_START,()=>{
            AudioRes.inst.playBtnSound();
            State.inst.ableMusic = !State.inst.ableMusic;
        });

        UINode.inst.newBtn.on(Node.EventType.TOUCH_START,()=>{
            closePupop(this.node)
            MapData.inst.initGameMap();
            PanelState.inst.score.data = 0;

        })

        this.continueBtn.on(Node.EventType.TOUCH_START,()=>{
            closePupop(this.node)
        })

        
    }


}


