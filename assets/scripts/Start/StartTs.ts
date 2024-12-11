import { _decorator, AssetManager, assetManager, AudioClip, Component, director, Node, Scene, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartTs')
export class StartTs extends Component {

    @property(Node) 
    public btnNode: Node = null;


    start() {
        this.btnNode.on('click', () => {
            director.loadScene('Game');
        });

        assetManager.loadBundle('resources', (err: string, budle: AssetManager.Bundle) => {
            if (budle) {
                console.log(budle)
                // budle.loadScene('Game',Scene,(finished:number,total:number)=>{
                //     console.log(finished)
                //     console.log(total)
                // },()=>{});
                budle.loadDir('texture/elimination',SpriteFrame,(finished:number,total:number)=>{
                    console.log(finished)
                    console.log(total)
                },()=>{});
                budle.loadDir('texture/common')
                budle.loadDir('texture/eliminateDie')
                budle.loadDir('audio',AudioClip)
            } else {
                console.log('资源加载失败' + err);
            }
        });
    }

    update(deltaTime: number) {
        
    }
}


