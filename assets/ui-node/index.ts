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

    /**设置按钮 */
    public settingBtn:Node = null;

    /**设置弹窗 */
    public settingPopup:Node = null

    public _eliminationContainer:Node = null;



    /**设置面板-音量按钮 */
    public musicBtn:Node = null

    /**设置面板-按钮声音按钮 */
    public soundBtn:Node = null


    /**设置面板-音量按钮关闭标识 */
    public musicBtnOff:Node = null

    /**设置面板-按钮声音关闭标识 */
    public soundBtnOff:Node = null

    /**当前score */
    public currentScore:Node = null;

    /**重新开始按钮 */
    public newBtn:Node = null;


    /**Pass通过节点 */
    public passNode:Node = null;

    padding:number = 10;


    get eliminationContainer() {
        return this._eliminationContainer
    }

    set eliminationContainer(node:Node) {
        this._eliminationContainer = this.adjustPosition(node);
    }

    adjustPosition(node:Node) {
        const transform = node.getComponent(UITransform);
        transform.setContentSize(new Size(UIData.inst.worldWidth-this.padding*2,UIData.inst.worldWidth-this.padding*2))
        transform.setAnchorPoint(0,0);
        node.setPosition(new Vec3(-UIData.inst.worldWidth/2+this.padding,-UIData.inst.worldHeight/2+this.padding));
        return node;
    }

    /**初始化节点并保存 */
    initNode() {
        this.root = find('Canvas');
        this.gameNode = find('Canvas/GameNode');
        this.eliminationContainer = find('Canvas/GameNode/EliminationContainer');
        this.settingBtn = find('Canvas/GameNode/Pause');
        this.settingPopup = find('Canvas/Popup/Setting');
        this.currentScore = find('Canvas/GameNode/Panel/CurrentScore');
        
    }



}


