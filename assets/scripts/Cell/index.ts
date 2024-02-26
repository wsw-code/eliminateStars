
import {AnimationClip, Vec3} from 'cc';


import { coordToPosition } from '../../utils';

import { Elimination } from '../Elimination';
import { FallClip } from '../animationClip/fall';
import { UIData } from '../uidata';
import { AudioRes } from '../AudioRes';
import { AudioPath } from '../../enum';










/**
 * 单元格实例
 */
export class Cell {
  /**消除物 */
  elimination:Elimination | null;


  
  /**坐标转换成单元格位置 */
  get cellPos() {
    const _pos = coordToPosition(this.coord.x,this.coord.y);
    return new Vec3(_pos.x,_pos.y);
  }

  get cellCenterPos() {
    return new Vec3(this.cellPos.x+UIData.inst.CellWidth/2,this.cellPos.y+UIData.inst.CellWidth/2)
  }

  constructor(
    public coord:{
      x:number,
      y:number
    }
  ) {

  }


  /**删除单元格节点和实例节点引用 */
  destroyCell() {
    this.elimination?.node?.destroy();
    this.elimination = null;
    AudioRes.inst.play(AudioPath.pop_star)
  }

  toggleLight() {
    this.elimination.lightNode.active = true
  }

  
  playFall(clip:AnimationClip=FallClip.inst.animationClip) {
    this.elimination.animationComponent.defaultClip = clip;
    return this.elimination.playAnimation()
  }











}