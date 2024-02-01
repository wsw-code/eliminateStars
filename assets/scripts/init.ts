import { _decorator, Component, Node,find, UITransform,Layers, Sprite, Color,Size,resources,SpriteFrame,Texture2D } from 'cc';
import {UINode} from '../ui-node'
const { ccclass, property } = _decorator;

import { Cell } from './mapdata';



@ccclass('init')
export class Init extends Component {

    start() {

        resources.loadDir('texture',SpriteFrame,(err,data)=>{

            console.log(err)
            if(!err) {
                console.log(data)

                data.map(el=>{
                    console.log(el)
                })
            }
        })

        this.initNode();
    }



    /**初始化节点并保存 */
    initNode() {    
        UINode.inst.root = find('Canvas');
        UINode.inst.gameNode = find('GameNode');

       

    }


    /**创建地图数据 */
    createMap() {
        

        
    }



    update(deltaTime: number) {
        
    }
}


