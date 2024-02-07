
import {Vec3,Node,Size, SpriteFrame,UITransform,Layers, Sprite, Animation} from 'cc'

import { ColorType } from "../../types";
import { UIData } from '../uidata';

import { UINode } from '../../ui-node';
import { coordToPosition, rnd } from '../../utils';
import { NodeName, PathString } from '../../enum';

import {FallClip} from '../animationClip/fall'




/**
 * 单元格实例
 */
export class Cell {


  //单元格节点 */
  cellNode:Node | null;

  /**消除物光圈 */
  lightNode:Node | null; 

  /**消除物 */
  eliminateNode:Node | null; 

  /**动画实例 */
  animationComponent:Animation


  /**坐标转换成单元格位置 */
  get cellPos() {
    const _pos = coordToPosition(this.coord.x,this.coord.y);
    return new Vec3(_pos.x,_pos.y);
  }



  constructor(
    public coord:{
      x:number,
      y:number
    },
    public id:`${ColorType}`
  ) {
    this.createEntireNode();
  }

  
  playFall() {
    console.log(FallClip.inst.animationClip)
    this.animationComponent.defaultClip = FallClip.inst.animationClip;
    this.animationComponent.play();
  }


  initWrapperNode() {
    const node = new Node(NodeName.cellWrapper)
    node.layer = 1 << Layers.nameToLayer('UI_2D');
    this.animationComponent = node.addComponent(Animation);
    node.setPosition(this.cellPos);
    this.setCommonUITransform(node);
    return node;
  }



  createEntireNode() {
    this.cellNode = this.initWrapperNode();
    this.eliminateNode = this.createEliminateNode();
    this.lightNode = this.createLightNode();
    this.eliminateNode.setParent(this.cellNode);
    this.lightNode.setParent(this.cellNode);
    this.cellNode.setParent(UINode.inst.eliminationContainer);
  }

  toggleLight() {
    this.lightNode.active = !this.lightNode.active
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



  createEliminateNode() {
    const node = new Node(NodeName.eliminate)
    const sprite = node.addComponent(Sprite);
    sprite.spriteFrame = UIData.inst.spriteMap.get(this.id)
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