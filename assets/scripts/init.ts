import { _decorator, Component, Node,find, UITransform,Layers, Sprite, Color,Size,resources,SpriteFrame,Animation, Vec3, AudioClip, Prefab, Font } from 'cc';
import {UINode} from '../ui-node'
const { ccclass } = _decorator;
import { UIData } from './uidata';

import {MapData} from './mapdata';
import { TouchCrtl } from './control/touch/Touch';
import {lightAnimationClip} from './animationClip/light'
import { Dir } from '../enum';
import { resLoad, spriteFrameLoad } from '../utils';
import { AudioRes } from './AudioRes';
import { SettingBtn } from './control/SettingBtn';
import { PrefabRes } from './Prefabs';
import { PanelEntry } from './Panel';

@ccclass('init')
export class Init extends Component {

    async start() {


        UINode.inst.initNode();
        this.loadAudio();
        Promise.all([
            resLoad({
                path:Dir.elimination,
                cb:UIData.inst.saveSpriteMap.bind(UIData.inst),
                type:SpriteFrame
            }),
            resLoad({
                path:Dir.eliminateDie,
                cb:UIData.inst.saveSpriteMap.bind(UIData.inst),
                type:SpriteFrame
            }),
            resLoad({
                path:Dir.prefabs,
                cb:PrefabRes.inst.savePrefabMap.bind(PrefabRes.inst),
                type:Prefab
            }),
        ]).then(()=>{
            MapData.inst.createMap();
            MapData.inst.executeFall();
            TouchCrtl.inst.initTouch();
            SettingBtn.inst.init()
            PanelEntry.inst.init()
        })



        

        
    

    }



    loadAudio() {
        resLoad({
            path:Dir.audioRes,
            cb:AudioRes.inst.saveAudioMap.bind(AudioRes.inst),
            type:AudioClip
        })
    }

    initWrapperNode() {
        const node = new Node('wrapper')
        const transform = node.addComponent(UITransform);
        transform.width = 100;
        transform.height = 100;
        node.layer = 1 << Layers.nameToLayer('UI_2D');
        node.setPosition(0,300);
        transform.setAnchorPoint(0,0)
        return node;
    }


    createLightNode() {

        const node = new Node('light')
        const transform = node.addComponent(UITransform);
        const sprite = node.addComponent(Sprite);
        sprite.spriteFrame = UIData.inst.spriteMap.get(Dir.elimination).get('block_light_hd')
        transform.width = 100;
        transform.height = 100;
        node.active = false

        node.layer = 1 << Layers.nameToLayer('UI_2D');
        return node;
    }


    initTestNode() {
        const wrapperNode = this.initWrapperNode()
        const node = new Node('child')
        const lightNode = this.createLightNode();
        const transform = node.addComponent(UITransform);
        const sprite = node.addComponent(Sprite);
      
    
        node.setPosition(0,0)
        sprite.spriteFrame = UIData.inst.spriteMap.get(Dir.elimination).get('red')
        // transform.setAnchorPoint(0, 1)
        node.layer = 1 << Layers.nameToLayer('UI_2D');
        
        transform.width = 100;
        transform.height = 100;

        node.setParent(wrapperNode);
        wrapperNode.setParent(UINode.inst.gameNode);
        lightNode.setParent(wrapperNode);
        const animationComponent = wrapperNode.addComponent(Animation);
        // animationComponent.addClip(lightAnimationClip);
        animationComponent.defaultClip = lightAnimationClip.inst.animationClip;
        
        
        animationComponent.play()
    
        
        return node

    }



    update(deltaTime: number) {
        
    }
}


