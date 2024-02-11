
import {Vec3,Node,Size, SpriteFrame,UITransform,Layers, Sprite, Animation, Component} from 'cc'

import { ColorType } from "../../types";
import { UIData } from '../uidata';

import { UINode } from '../../ui-node';
import { coordToPosition, getCellPos, rnd } from '../../utils';
import { NodeName, PathString } from '../../enum';

import {FallClip} from '../animationClip/fall'


export class Elimination {


    /**星星初始位置 */

    starInitPos:Vec3;

    /**消除物光圈 */
    lightNode:Node | null; 
  
    /**星星消除物 */
    starNode:Node | null; 
  
    node:Node ;
  
    /**动画实例 */
    animationComponent:Animation;
  
    get cellPos() {
        return getCellPos(this.crood.x,this.crood.y)
    }
  
  
    constructor(public crood:{x:number,y:number},public kindId:string) {
   
      this.node = this.createNode();
      this.lightNode = this.createLightNode();
      this.starNode = this.createStarNode();
      this.starNode.setParent(this.node);
      this.lightNode.setParent(this.node);
      this.node.setParent(UINode.inst.eliminationContainer);
      console.log(this.node)
    }
  
    createNode() {
      const node = new Node(NodeName.cellWrapper)  
      node.layer = 1 << Layers.nameToLayer('UI_2D');
      this.animationComponent = node.addComponent(Animation);
      node.setPosition(this.starInitPos || this.cellPos);
      this.setCommonUITransform(node);
      return node;
    }
    createLightNode() {
      const node = new Node(NodeName.light)
      const sprite = node.addComponent(Sprite);
      sprite.spriteFrame = UIData.inst.spriteMap.get(PathString.block_light_hd)
      node.active = false;
      node.layer = 1 << Layers.nameToLayer('UI_2D');
      this.setChildUITransform(node);
      return node;
    }



    createStarNode() {
      const node = new Node(NodeName.star)
      const sprite = node.addComponent(Sprite);
      sprite.spriteFrame = UIData.inst.spriteMap.get(this.kindId)
      node.layer = 1 << Layers.nameToLayer('UI_2D');
      this.setChildUITransform(node);
      return node
    }
  
    setCommonSize(transform:UITransform) {
      transform.width = UIData.inst.CellWidth;
      transform.height = UIData.inst.CellWidth;
    }
  
    setChildUITransform(node:Node) {
      const transform = node.addComponent(UITransform);
      this.setCommonSize(transform);
      transform.setAnchorPoint(0.5,0);
      node.setPosition(UIData.inst.CellWidth/2,0);
    }
  
    setCommonUITransform(node:Node) {
      const transform = node.addComponent(UITransform);
      this.setCommonSize(transform);
      transform.setAnchorPoint(0,0);
    }
  }