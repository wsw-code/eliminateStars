import { AudioClip, SpriteFrame,Node, Sprite, UITransform, tween, Vec3, UIOpacity, Tween } from "cc";
import Singleton from "../../base/singleton";
import { UINode } from "../../ui-node";
import { AudioRes } from "../AudioRes";
import { UIData } from "../uidata";
import { AudioPath, CommonSprite, Dir } from "../../enum";



type Props = {
  audioPath:string,
  sprite:SpriteFrame
}


export class Evaluate extends Singleton {

  static get inst() {

    return super.getInstance<Evaluate>()

  }

    evaluateMap:Map<[number,number],Props> = new Map()

    evaluateNodeMap:Map<SpriteFrame,Node> = new Map();



  constructor() {
    super();

    this.init()



  }


  init() {

    const _spriteMap = UIData.inst.spriteMap.get(Dir.common);
    console.log(UIData.inst.spriteMap)
    this.evaluateMap.set([10,Infinity],{
      audioPath:AudioPath.combo_3,
      sprite:_spriteMap.get(CommonSprite.game_score4)
    });

    this.evaluateMap.set([8,9],{
      audioPath:AudioPath.combo_3,
      sprite:_spriteMap.get(CommonSprite.game_score3)
    });


    this.evaluateMap.set([6,7],{
      audioPath:AudioPath.combo_2,
      sprite:_spriteMap.get(CommonSprite.game_score2)
    })

    this.evaluateMap.set([4,5],{
      audioPath:AudioPath.combo_1,
      sprite:_spriteMap.get(CommonSprite.game_score1)
    })

  }

  showEvaluateSprite(spriteFrame:SpriteFrame) {
    const evaluateNode = this.evaluateNodeMap.get(spriteFrame)
    if(evaluateNode) {
      this.evaluateNodeAnim(evaluateNode);
      return 
    }
    const node = new Node();

    const sprite = node.addComponent(Sprite);
    sprite.spriteFrame = spriteFrame;
    node.setParent(UINode.inst.gameNode);
    node.addComponent(UIOpacity);
    this.evaluateNodeMap.set(spriteFrame,node);
    this.evaluateNodeAnim(node);
  }

  evaluateNodeAnim(node:Node) {
    Tween.stopAllByTarget( node ) ;
    node.active = true;
    node.scale = new Vec3(0.1,0.1,1)
    node.getComponent(UIOpacity).opacity = 255;

    tween(node).to(0.2,{
      scale:new Vec3(1,1,1),
    })
    .delay(0.3)
    .call(()=>{
      tween(node.getComponent(UIOpacity))
      .to(0.2,{
        opacity:0
      })
      .call(()=>{
        node.active = false
      })
      .start()
    })
    .start()

  }


  show(num:number) {
  
   

    for (const [[min,max],{audioPath,sprite}] of this.evaluateMap) {
     
      if(num>=min && num <= max) {
        AudioRes.inst.play(audioPath);
        this.showEvaluateSprite(sprite)
        break
      }

    }
    
  }


}