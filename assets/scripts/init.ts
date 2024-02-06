import { _decorator, Component, Node,find, UITransform,Layers, Sprite, Color,Size,resources,SpriteFrame,Animation, Vec3 } from 'cc';
import {UINode} from '../ui-node'
const { ccclass } = _decorator;
import { UIData } from './uidata';

import {MapData} from './mapdata';
import { TouchCrtl } from './control/touch/Touch';
import { tesAnimationClip } from './animationClip/eliminate';
import {lightAnimationClip} from './animationClip/light'

@ccclass('init')
export class Init extends Component {

    start() {


        resources.loadDir('texture',SpriteFrame,(err,data)=>{
          
            if(!err) {
                UIData.inst.saveSpriteMap(data);
                this.initNode();
                MapData.inst.createMap()
                TouchCrtl.inst.initTouch();
                // this.initTestNode()
            }
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
        sprite.spriteFrame = UIData.inst.spriteMap.get('block_light_hd')
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
        sprite.spriteFrame = UIData.inst.spriteMap.get('red')
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




    /**初始化节点并保存 */
    initNode() {    
        UINode.inst.root = find('Canvas');
        UINode.inst.gameNode = find('Canvas/GameNode');
        UINode.inst.eliminationContainer = find('Canvas/GameNode/EliminationContainer');
    }




    update(deltaTime: number) {
        
    }
}


