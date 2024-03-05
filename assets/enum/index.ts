

/**
 * node节点名称枚举
 */
export enum NodeName {
  /**消除物边框 */
  light="light",
  /**消除物 */
  star="star",
  /**消除物容器 */
  cellWrapper="cellWrapper"
}


export enum PathString {
  /**消除物光圈图片名称 */
  block_light_hd="block_light_hd",

}



export enum Dir {
  elimination="texture/elimination",
  eliminateDie="texture/eliminateDie",
  audioRes="audio",
  prefabs="prefabs",
  font="font"
}


export enum AudioPath {
  /**星星消除声音 */
  pop_star='pop_star',
  /**按钮点击声音 */
  btnClick='btnClick',
  /**背景音乐 */
  bgm="bgm"
}


export enum PrefabPath {
  /**设定按钮 */
  Setting="Setting",
  /**遮罩 */
  Mask="Mask",
  /**分数 */
  Score="Score"
}