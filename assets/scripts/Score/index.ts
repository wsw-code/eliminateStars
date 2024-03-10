import { Node, IQuatLike, Label, Quat, UITransform, Vec2, Vec3, instantiate, tween, Tween } from "cc";
import Singleton from "../../base/singleton";
import { PrefabRes } from "../Prefabs";
import { PrefabPath } from "../../enum";
import { UINode } from "../../ui-node";
import { Cell } from "../Cell";
import { UIData } from "../uidata";
import { NumberRolling } from "../NumberRolling";




export class Score extends Singleton {
    static get inst() {
        return super.getInstance<Score>();
    }

    timer = null;
    ableAnimate:boolean = true;

    speed:number = 2800

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
        /**获取向上移动坐标 */
        Vec3.transformRTS(_targetPos,Vec3.ONE,Quat.IDENTITY,new Vec3(0,UIData.inst.CellWidth/2,0),_pos);
        let worldPos = UINode.inst.currentScore.getComponent(UITransform).convertToWorldSpaceAR(Vec3.ZERO);
        let position = UINode.inst.gameNode.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
        const length = Vec3.distance(node.position,position)
        const animateTime = length/this.speed
        tween( node )
        .to( 0.1 , { position : _targetPos})
        .delay(0.25)
        .to( animateTime , { position : position})
        .call(()=>{
            node?.destroy();
            this.scoreShowMore();
        })
        .start()
        
    }

    numberRolling(targetNumber:number) {

        let inst = UINode.inst.currentScore.getComponent(NumberRolling);
        if(!inst) {
            inst = UINode.inst.currentScore.addComponent(NumberRolling);
        }

        inst.initRolling();

     

    }

    /**
     * 分数放大显示
     */
    scoreShowMore() {
        const node = UINode.inst.currentScore;
        Tween.stopAllByTarget( node ) ;
        tween( node ).sequence(

            tween( node ).to( 0.1 , {scale : new Vec3( 1.5 , 1.5 )} ) , 
            tween( node ).to( 0.1 , {scale : new Vec3( 1.0 , 1.0 )} ) , 

        ).start() ;

    }

    createScore(num:number,cell:Cell) {
        const _pos = UINode.inst.gameNode.getComponent(UITransform).convertToNodeSpaceAR(cell.elimination.node.position)
        const node = instantiate(PrefabRes.inst.prefabMap.get(PrefabPath.Score));
        node.getComponent(Label).string = num+'';
        Vec3.transformRTS(_pos,Vec3.ONE,Quat.IDENTITY,new Vec3(UIData.inst.CellWidth/2,UIData.inst.CellWidth/2,0),_pos)
        node.setPosition(_pos);
        node.setParent(UINode.inst.gameNode);
        return node
    }






}