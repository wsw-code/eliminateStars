import { Component, find,Node,_decorator, Label, NodeEventType } from "cc";
import { closePupop } from "../Popup";


const { ccclass } = _decorator;

type DialogConfigProps = {
  contentStr:string
}

@ccclass('Dialog')
export class Dialog extends Component {


  /**弹窗内容节点 */
  contentNode:Node = null;

  confirmBtn:Node = null;


  callBackFn:()=>void;

  protected onLoad(): void {
    console.log('执行onLoad')
    this.contentNode = find('container/Content',this.node);
    this.confirmBtn = find('container/Confirm',this.node);
    this.contentNode.getComponent(Label).string = '';
    this.initEvents();
  }

  initEvents() {
    this.confirmBtn.on(Node.EventType.TOUCH_END,()=>{
        closePupop(this.node);
    })
  }

  config(config:DialogConfigProps) {
    console.log('config === ',config)
    this.contentNode.getComponent(Label).string = config.contentStr;
  }
  

  







  
} 

