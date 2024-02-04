import { _decorator, Component, Node,find, UITransform,Layers, Sprite, Color,Size,resources,SpriteFrame,Animation, Vec3 } from 'cc';
import {UINode} from '../ui-node'
const { ccclass } = _decorator;
import { UIData } from './uidata';

import {MapData} from './mapdata';
import { TouchCrtl } from './control/touch/Touch';
import { tesAnimationClip } from './animationClip/eliminate';


@ccclass('init')
export class Init extends Component {

    start() {


        resources.loadDir('texture',SpriteFrame,(err,data)=>{
          
            if(!err) {
                UIData.inst.saveSpriteMap(data);
                this.initNode();
                MapData.inst.createMap()
                TouchCrtl.inst.initTouch();
                this.initTestNode()
            }
        })

        
    }


    initTestNode() {
        const node = new Node('nodeName')
        const transform = node.addComponent(UITransform);
        const sprite = node.addComponent(Sprite);
        console.log(node)
    
     
        sprite.spriteFrame = UIData.inst.spriteMap.get('red')
        // transform.setAnchorPoint(0, 1)
        node.layer = 1 << Layers.nameToLayer('UI_2D');
        node.setPosition(new Vec3(0,300))
        transform.width = 100;
        transform.height = 100;

        node.setParent(UINode.inst.gameNode);
        const animationComponent = node.addComponent(Animation);
        animationComponent.defaultClip = tesAnimationClip;
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


