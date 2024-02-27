import Singleton from "../../base/singleton";
import {Color, Node, Size, Sprite, UITransform} from 'cc';
import { UINode } from "../../ui-node";


export class Popup extends Singleton {

    static get inst() {
        return super.getInstance<Popup>()
    }


    popupMap:Map<Node,Node> = new Map();



    show(node:Node) {

        if(!this.popupMap.get(node)) {





        }



    }


    createMask() {
        const node = new Node('mask');

        const transform = node.addComponent(UITransform);

        transform.contentSize = new Size(2000,2000);

        const sprite = node.addComponent(Sprite);


        sprite.color = new Color(0,0,0,0.5);


        node.setParent(UINode.inst.root)

        console.log(1)

    }



}