

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
  common="texture/common",
  audioRes="audio",
  prefabs="prefabs",
  font="font"
}

export enum CommonSprite {
  game_score1="game_score1",
  game_score2="game_score2",
  game_score3="game_score3",
  game_score4="game_score4",
  pass="pass"
}


export enum AudioPath {
  /**星星消除声音 */
  pop_star='pop_star',
  /**按钮点击声音 */
  btnClick='btnClick',
  /**背景音乐 */
  bgm="bgm",

  /**评价1 */
  combo_1="combo_1",
  /**评价2 */
  combo_2="combo_2",
  /**评价3 */
  combo_3="combo_3",

}


export enum PrefabPath {
  /**设定按钮 */
  Setting="Setting",
  /**遮罩 */
  Mask="Mask",
  /**分数 */
  Score="Score",

  /**对话框 */
  Dialog="Dialog"
}



export enum GlobalEvents {

}



export enum CommonNodeName {
  /**弹窗遮罩节点名称 */
  NAME_MASK = "NAME_MASK",
  /**弹窗最顶部节点 */
  NAME_POPUP = "NAME_POPUP"
}