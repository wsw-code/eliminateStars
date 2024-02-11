import { Node, Vec3, tween } from "cc";
import Singleton from "../../../base/singleton";



export class FallCtrl extends Singleton {
    static get inst(){
        return super.getInstance<FallCtrl>()
    }

    public delay:number = 0.09;


    public fallSpeed:number = 2500;

    fallCount:number = 0;


    executeSingleFall(node:Node,startPos:Vec3,endPos:Vec3) {
        node.setPosition(startPos);
        return new Promise((res,rej)=>{
            const duration = Math.abs(( endPos.y - startPos.y  )) / this.fallSpeed;
            tween( node ).to( duration , { position : endPos } ).call( ()=>{
                res('complete')
            } ).start() ;
        })
    } 


    executeMutiFall(nodeList:Node[],startPos:Vec3,endPos:Vec3) {
        
        const promiseArr:Promise<any>[] = [];
        nodeList.forEach(el=>{
            promiseArr.push(this.executeSingleFall(el,startPos,endPos))
        });

        Promise.all(promiseArr)
        .then(()=>{
            console.log('全部完成下落')
        })
        
    }




}