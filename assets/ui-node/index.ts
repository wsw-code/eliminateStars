import { _decorator, Component, Node,find } from 'cc';
import Singleton from '../base/singleton'
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

    

}


