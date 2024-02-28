import { Prefab } from "cc";
import Singleton from "../../base/singleton";



export class PrefabRes extends Singleton {
  static get inst() {
    return super.getInstance<PrefabRes>()
  }

  prefabMap:Map<string,Prefab> = new Map();


  savePrefabMap(prefabList:Prefab[]) {
    prefabList.forEach(el=>{
      this.prefabMap.set(el.name,el);
    })
  }

}