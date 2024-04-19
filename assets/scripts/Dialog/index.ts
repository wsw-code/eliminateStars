import { Component, find,Node,_decorator, Label, NodeEventType } from "cc";

const { ccclass, property } = _decorator;


type ConfigProps = {
  contextStr:string;
}

@ccclass('Dialog')
export class Dialog extends Component {


  /**弹窗内容节点 */
  contentNode:Node = null;

  confirmBtn:Node = null;

  protected onLoad(): void {
    this.contentNode = find('container/Content',this.node);
    this.confirmBtn = find('container/Confirm',this.node);

    this.initEvents();
  }

  initEvents() {
    this.confirmBtn.on(Node.EventType.TOUCH_END,()=>{
      const mask = find("Mask",this.node.parent);

      mask.emit(NodeEventType.TOUCH_END)
    })
  }


  config({contextStr}:ConfigProps) {
    this.contentNode.getComponent(Label).string = contextStr
  }




  
} 

