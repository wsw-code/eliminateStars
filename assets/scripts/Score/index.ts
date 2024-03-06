import { Node, IQuatLike, Label, Quat, UITransform, Vec2, Vec3, instantiate, tween } from "cc";
import Singleton from "../../base/singleton";
import { PrefabRes } from "../Prefabs";
import { PrefabPath } from "../../enum";
import { UINode } from "../../ui-node";
import { Cell } from "../Cell";
import { UIData } from "../uidata";




export class Score extends Singleton {
    static get inst() {
        return super.getInstance<Score>();
    }

    constructor() {
        super();


        

        
    }

    showScore(num:number,cell:Cell) {
        const node = this.createScore(num,cell);
        this.animateScore(node)
    }

    animateScore(node:Node) {
        const _pos = node.position;
        let _targetPos:Vec3 = new Vec3();
        Vec3.transformRTS(_targetPos,Vec3.ONE,Quat.IDENTITY,new Vec3(0,UIData.inst.CellWidth/2,0),_pos)
        tween( node )
        .to( 0.1 , { position : _targetPos})
        .call(()=>{
            console.log(111)
        })
        .start()
    }

    createScore(num:number,cell:Cell) {
        const _pos = cell.elimination.node.getComponent(UITransform).convertToWorldSpaceAR(UINode.inst.eliminationContainer.position)
        const node = instantiate(PrefabRes.inst.prefabMap.get(PrefabPath.Score));
        node.getComponent(Label).string = num+'';

        

         

        Vec3.transformRTS(_pos,Vec3.ONE,Quat.IDENTITY,new Vec3(UIData.inst.CellWidth/2,UIData.inst.CellWidth/2,0),_pos)

        node.setPosition(_pos);
        node.setParent(UINode.inst.gameNode);
        return node
    }






}