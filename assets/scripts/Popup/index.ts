import Singleton from "../../base/singleton";
import {Color, Node, Prefab, Size, Sprite, UITransform, Vec3, resources, tween} from 'cc';
import { UINode } from "../../ui-node";
import {instantiate} from 'cc'
import { PrefabRes } from "../Prefabs";
import { PrefabPath } from "../../enum";

export class Popup extends Singleton {

    static get inst() {
        return super.getInstance<Popup>()
    }


    popupMap:Map<Prefab,Node> = new Map();

  

    show(prefab:Prefab) {

        const node = this.popupMap.get(prefab);

        if(node) {

        } else {

            const popupContainer = new Node();
            const maskNode = this.createMask();
            maskNode.setParent(popupContainer);
            const child = instantiate(prefab);
            child.setParent(popupContainer);
            popupContainer.setParent(UINode.inst.gameNode);
            this.openAnimation(child);
        }





    }

    createPopop(node:Node) {

    }




    createMask() {
        const maskNode = instantiate(PrefabRes.inst.prefabMap.get(PrefabPath.Mask));

        maskNode.on(Node.EventType.TOUCH_END,()=>{
            
            const parentNode = maskNode.getParent();
            // const sNode = maskNode.get
            // if()


        });

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

    closeAnimation() {

    }






}