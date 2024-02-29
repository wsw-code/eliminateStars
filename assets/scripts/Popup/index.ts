import { Prefab, instantiate,Node, Vec3, tween } from "cc";
import { PopupPool } from "../PopupPool";
import { PrefabRes } from "../Prefabs";
import { UINode } from "../../ui-node";
import { PrefabPath } from "../../enum";



export class Popup  {

  root:Node = null;

  maskNode:Node = null;

  /**弹窗内容 */
  popupContentNode:Node = null;

  constructor(public prefab:Prefab) {
      this.createPopup();
      this.initCloseEvent();
  }


  createPopup() {
      this.root = new Node();
      this.maskNode = this.createMask();
      this.maskNode.setParent(this.root);
      this.popupContentNode = instantiate(this.prefab);
      this.popupContentNode.setParent(this.root);
      this.show();
  }

  show() {

      const _rootNode = PopupPool.inst.popupNodePool.get(this.root)
     if(_rootNode) {
      _rootNode.setParent(UINode.inst.gameNode);
     } else {
      this.root.setParent(UINode.inst.gameNode);
     }
     this.openAnimation(this.popupContentNode);
  }

  initCloseEvent() {
      this.maskNode.on(Node.EventType.TOUCH_END,()=>{
          this.closeAnimation(this.popupContentNode)
          .then(()=>{
              PopupPool.inst.popupNodePool.put(this.root);
          })
      });
  }

  createMask() {
      const maskNode = instantiate(PrefabRes.inst.prefabMap.get(PrefabPath.Mask));
      return maskNode
  }

  openAnimation(node:Node) {
      return new Promise((res)=>{
          node.scale = new Vec3( 0.2 , 0.2 );
          tween( node ).sequence(
              tween( node ).to( 0.1 , { scale : new Vec3( 1.1 , 1.1 ) } ) , 
              tween( node ).to( 0.1 , { scale : new Vec3( 1 , 1 ) } ) , 
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
              tween( node ).to( 0.2 , { scale : new Vec3( 0.1 , 0.1 ) } ) , 
          )
          .call(()=>{
              res(null)
          })
          .start() ;
      })
  }

}