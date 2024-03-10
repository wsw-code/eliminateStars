import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Init')
export class Init extends Component {

    @property(Node)
    Child:Node = null

    @property(Node)
    Box:Node = null


    @property(Node)
    Box2:Node = null


    @property(Node)
    Child2:Node = null

    start() {
        console.log('Init')

        this.initChild();
        // this.initChild2();
    }

    initChild() {
        console.log(this.node);
        console.log(this.Child)
        let pos3:Vec3 = new Vec3();
        let pos4:Vec3 = new Vec3();
        const pos = this.Child.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(0,0,0),pos3)
        const pos2 = this.node.getComponent(UITransform).convertToNodeSpaceAR(this.Child.position,pos4);
        console.log(pos,pos2);
        console.log(pos3,pos4);

        const pos5 = this.Child.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(20,0,0));
        const pos6 = this.node.getComponent(UITransform).convertToNodeSpaceAR(pos5);
        console.log(pos6)
    }
    
    initChild2() {

        const pos = this.Child2.getComponent(UITransform).convertToNodeSpaceAR(this.node.position)
        const pos2 = this.node.getComponent(UITransform).convertToNodeSpaceAR(this.Child2.position)
        console.log(pos,pos2)
    }


    update(deltaTime: number) {
        
    }
}


