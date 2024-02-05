

import { animation, AnimationClip, Vec3 } from "cc";

const animationClip = new AnimationClip();
animationClip.duration = 10; // 整个动画剪辑的周期

const track  = new animation.ObjectTrack(); // 创建一个向量轨道


track.path = new animation.TrackPath().toHierarchy('light').toProperty('active'); // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性

// 如果关键帧的组织是 [时间, 向量] 数组，可以利用解构语法赋值每一条通道曲线。
const vec3KeyFrames = [
    [0,{value:false}],
    [1,{value:true}],
    [2,{value:true}],
] as [number, {value:boolean}][];
track.channel.curve.assignSorted(vec3KeyFrames.map(([time, v]) => [time, v.value]));



// 最后将轨道添加到动画剪辑以应用
animationClip.addTrack(track);
// animationClip.wrapMode = AnimationClip.WrapMode.Loop;

console.log('animationClip',animationClip)

animationClip.wrapMode = AnimationClip.WrapMode.Loop

export const lightAnimationClip = animationClip