import { NodePool } from "cc";
import Singleton from "../../base/singleton";

 



 export class PopupPool extends Singleton {
    static get inst() {
      return super.getInstance<PopupPool>();
    }

    popupNodePool:NodePool;


    constructor() {
      super();
      this.popupNodePool = new NodePool();
    }

 }