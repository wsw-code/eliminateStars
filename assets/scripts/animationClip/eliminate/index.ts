

import { animation, AnimationClip, Vec3 } from "cc";

const animationClip = new AnimationClip();
animationClip.duration = 0.5; // 整个动画剪辑的周期

const track  = new animation.SizeTrack(); // 创建一个向量轨道


track.path = new animation.TrackPath().toHierarchy('child').toProperty('scale'); // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性
const [x, y] = track.channels(); // x, y, z 是前三条通道


// 如果关键帧的组织是 [时间, 向量] 数组，可以利用解构语法赋值每一条通道曲线。
const vec3KeyFrames = [
    [0.15, {x:0.9,y:0.9}],
    [0.25, {x:0.5,y:0.5}],
] as [number, Vec3][];
x.curve.assignSorted(vec3KeyFrames.map(([time, vec3]) => [time, { value: vec3.x }]));
y.curve.assignSorted(vec3KeyFrames.map(([time, vec3]) => [time, { value: vec3.y }]));


// 最后将轨道添加到动画剪辑以应用
animationClip.addTrack(track);
// animationClip.wrapMode = AnimationClip.WrapMode.Loop;

console.log('animationClip',animationClip)

export const tesAnimationClip = animationClip