import { _decorator, Component, Node,find, UITransform,Layers, Sprite, Color,Size,resources,SpriteFrame,Animation, Vec3, AudioClip, Prefab, Font, assetManager, AssetManager } from 'cc';
import {UINode} from '../UiNode'
const { ccclass } = _decorator;
import { UIData } from './uidata';

import {MapData} from './Mapdata';
import { TouchCrtl } from './control/touch/Touch';
import {lightAnimationClip} from './animationClip/light'
import { Dir, GLOBAL_EVENTS, LOCAL_STORAGE } from '../enum';
import { resLoad } from '../utils';
import { AudioRes } from './AudioRes';
import { PrefabRes } from './Prefabs';
import { PanelEntry } from './Panel';
import { Evaluate } from './Evaluate';
import GlobalState from './GlobalState'
import {global_state} from './GlobalState/State'


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
                path:Dir.common,
                cb:UIData.inst.saveSpriteMap.bind(UIData.inst),
                type:SpriteFrame
            }),
            resLoad({
                path:Dir.prefabs,
                cb:PrefabRes.inst.savePrefabMap.bind(PrefabRes.inst),
                type:Prefab
            }),
        ]).then(()=>{
            GlobalState.inst.init();
            MapData.inst.initGameMap();
            TouchCrtl.inst.initTouch();
            PanelEntry.inst.init();
            Evaluate.inst.show(1);
            this.initData();
            
        })

    }



    initData() {

        this.getRecord()
        this.getSoundConfig()
        this.testFn()
    }

    testFn() {

        assetManager.loadBundle('res', (err: string, budle: AssetManager.Bundle) => {
            if (budle) {
               console.log(budle, '资源加载成功')
            } else {
                console.log('资源加载失败' + err);
            }
        });

    }


    getSoundConfig() {
        try {
            const config = JSON.parse(localStorage.getItem(LOCAL_STORAGE.SOUND_CONFIG)); 

            global_state.dispatch({
                ableMusic:config.ableMusic,
                ableSound:config.ableSound
            })

        } catch (error) {
            console.log(error)
        }
        
    }


    getRecord() {
        const num = Number(localStorage.getItem(LOCAL_STORAGE.RECOED_SCORE) || 0);
        UINode.inst.globalEventNode.emit(GLOBAL_EVENTS.GET_RECORD,num)

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
        node.layer = 1 << Layers.nameToLayer('UI_2D');
        transform.width = 100;
        transform.height = 100;
        node.setParent(wrapperNode);
        wrapperNode.setParent(UINode.inst.gameNode);
        lightNode.setParent(wrapperNode);
        const animationComponent = wrapperNode.addComponent(Animation);
        animationComponent.defaultClip = lightAnimationClip.inst.animationClip;
        animationComponent.play()
        return node
    }



    update(deltaTime: number) {
        
    }
}


