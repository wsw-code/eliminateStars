import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartTs')
export class StartTs extends Component {

    @property(Node) 
    public btnNode: Node = null;


    start() {
        this.btnNode.on('click', () => {
            director.loadScene('Game');
        });
    }

    update(deltaTime: number) {
        
    }
}


