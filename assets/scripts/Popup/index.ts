import { Prefab, instantiate,Node, Vec3, tween, BlockInputEvents, find, NodeEventType } from "cc";
import { PrefabRes } from "../Prefabs";
import { UINode } from "../../ui-node";
import { CommonNodeName, PrefabPath } from "../../enum";



export enum PopupEventType  {
    /**弹窗确认 */
    POPUP_CONFIRM="POPUP_CONFIRM",
    /**弹窗关闭 */
    POPUP_CLOSE="POPUP_CLOSE"
}

/**弹窗配置 */
export type ConfigProps = {
  /**弹窗回调函数 */
  callBackFn?:(...val:any[])=>void;

}


export class Popup  {

  root:Node = null;

  maskNode:Node = null;

  /**弹窗内容 */
  popupContentNode:Node = null;

  /**阻止重复进入关闭弹窗标识 */
  stopMutiEnter:boolean = false;

  constructor(public prefab:Prefab,public config:ConfigProps={}) {
      this.createPopup();
      this.initCloseEvent();


  }


  createPopup() {
      this.root = new Node(CommonNodeName.NAME_POPUP);
      this.maskNode = this.createMask();
      this.maskNode.setParent(this.root);
      this.popupContentNode = instantiate(this.prefab);
      this.popupContentNode.setParent(this.root);
      this.show();
  }

  show() {



    this.root.setParent(UINode.inst.gameNode);

     this.root.active = true

     this.openAnimation(this.popupContentNode);
  }

  closePopup() {
    if(this.stopMutiEnter) {
      return 
    }
    this.stopMutiEnter = true;
    const {callBackFn} = this.config;
    this.closeAnimation(this.popupContentNode)
    .then(()=>{
        this.root.active = false;
        callBackFn?.();
    })
    .finally(()=>{
      this.stopMutiEnter = false
    })
  }

  initCloseEvent() {

      this.root.on(PopupEventType.POPUP_CLOSE,()=>{
        this.closePopup();
      });

      this.maskNode.on(Node.EventType.TOUCH_END,()=>{
        this.closePopup();
      });

      this.root.on(PopupEventType.POPUP_CONFIRM,()=>{
        this.closePopup();
      });
  }

  createMask() {
      const maskNode = instantiate(PrefabRes.inst.prefabMap.get(PrefabPath.Mask));
      maskNode.name = CommonNodeName.NAME_MASK
      return maskNode
  }

  openAnimation(node:Node) {
      return new Promise((res)=>{
          node.scale = new Vec3( 0.2 , 0.2 );
          tween( node ).sequence(
              tween( node ).to( 0.15 , { scale : new Vec3( 1.1 , 1.1, 1 ) } ) , 
              tween( node ).to( 0.1 , { scale : new Vec3( 1 , 1, 1 ) } ) , 
          )
          .call(()=>{
              res(null)
          })
          .start() ;
      })
  }

  closeAnimation(node:Node) {
      return new Promise((res)=>{
          tween( node ).sequence(
              tween( node ).to( 0.1 , { scale : new Vec3( 0.1 , 0.1 ) } ) , 
          )
          .call(()=>{
              res(null)
          })
          .start() ;
      })
  }

}



/**
 * 关闭上层弹窗节点
 * @param node 弹窗节点下的任意节点
 * @param maxNum 遍历次数
 */
export const closePupop = (node:Node,maxNum:number=10) => {

    if(maxNum>100) {
        console.warn(`不超过100循环次数`);
        return 
    }

    let currentNode:Node = node;
  
    for (let index = 0; index < 10; index++) {
      
      currentNode = currentNode.parent;
      if(currentNode.name === CommonNodeName.NAME_POPUP) {
        break;
      }
      if(index == maxNum-1) {
        console.warn(`子节点和弹窗父节点之间嵌套超过${maxNum}层,请调整参数`);
        return 
      }
    }
    currentNode?.emit(PopupEventType.POPUP_CLOSE);
}