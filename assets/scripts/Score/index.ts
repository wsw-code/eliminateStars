import { Label, UITransform, Vec2, Vec3, instantiate } from "cc";
import Singleton from "../../base/singleton";
import { PrefabRes } from "../Prefabs";
import { PrefabPath } from "../../enum";
import { UINode } from "../../ui-node";
import { Cell } from "../Cell";




export class Score extends Singleton {
    static get inst() {
        return super.getInstance<Score>();
    }

    constructor() {
        super();


        

        
    }

    createScore(num:number,cell:Cell) {
       
      
        const _pos = cell.elimination.node.getComponent(UITransform).convertToWorldSpaceAR(UINode.inst.eliminationContainer.position);

       
        console.log('_pos',_pos)
        const node = instantiate(PrefabRes.inst.prefabMap.get(PrefabPath.Score));
        node.getComponent(Label).string = num+'';
        console.log(node);
        node.setPosition(_pos)
        node.setParent(UINode.inst.gameNode);

    }



}