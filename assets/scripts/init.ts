import { _decorator, Component, Node,find, UITransform,Layers, Sprite, Color,Size,resources,SpriteFrame,Texture2D, assetManager, AssetManager, Widget } from 'cc';
import {UINode} from '../ui-node'
const { ccclass } = _decorator;
import { UIData } from './uidata';

import {MapData} from './mapdata';
import { TouchCrtl } from './control/touch/Touch';



@ccclass('init')
export class Init extends Component {

    start() {


        resources.loadDir('texture',SpriteFrame,(err,data)=>{
          
            if(!err) {
                UIData.inst.saveSpriteMap(data);
                this.initNode();
                this.createMap();
                TouchCrtl.inst.initTouch();
            }
        })

        
    }

    initUISprite() {

      

    }





    /**初始化节点并保存 */
    initNode() {    
        UINode.inst.root = find('Canvas');
        UINode.inst.gameNode = find('Canvas/GameNode');
        UINode.inst.eliminationContainer = find('Canvas/GameNode/EliminationContainer');
    }


    /**创建地图数据 */
    createMap() {
        MapData.inst.createMap()
    }



    update(deltaTime: number) {
        
    }
}


