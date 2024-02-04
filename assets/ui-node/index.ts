import { _decorator, Component, Node,find, Vec3, UITransform, Size } from 'cc';
import Singleton from '../base/singleton'
import { UIData } from '../scripts/uidata';
const { ccclass, property } = _decorator;

@ccclass('index')
export class UINode extends Singleton {
    static get inst(){
        return super.getInstance<UINode>()
    }
    /**
     * canvas node节点
     */
    public root:Node = null;

    public gameNode:Node = null;

    public _eliminationContainer:Node = null

    get eliminationContainer() {
        return this._eliminationContainer
    }

    set eliminationContainer(node:Node) {
        this._eliminationContainer = this.adjustPosition(node);
    }

    adjustPosition(node:Node) {
        const transform = node.getComponent(UITransform);
        transform.setContentSize(new Size(UIData.inst.worldWidth,UIData.inst.worldWidth))
        transform.setAnchorPoint(0,0);
        node.setPosition(new Vec3(-UIData.inst.worldWidth/2,-UIData.inst.worldHeight/2));
        return node;
    }



}


