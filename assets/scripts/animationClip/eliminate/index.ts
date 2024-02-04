

import { animation, AnimationClip, Vec3 } from "cc";

const animationClip = new AnimationClip();
animationClip.duration = 1.0; // 整个动画剪辑的周期

const track  = new animation.VectorTrack(); // 创建一个向量轨道
track.componentsCount = 3; // 使用向量轨道的前三条通道

track.path = new animation.TrackPath().toProperty('position'); // 指定轨道路径，即指定目标对象为 "Foo" 子节点的 "position" 属性
const [x, y, z] = track.channels(); // x, y, z 是前三条通道


// 如果关键帧的组织是 [时间, 向量] 数组，可以利用解构语法赋值每一条通道曲线。
const vec3KeyFrames = [
    [0.4, new Vec3(0, 200)],
    [0.6, new Vec3(0, 100)],
] as [number, Vec3][];
x.curve.assignSorted(vec3KeyFrames.map(([time, vec3]) => [time, { value: vec3.x }]));
y.curve.assignSorted(vec3KeyFrames.map(([time, vec3]) => [time, { value: vec3.y }]));


// 最后将轨道添加到动画剪辑以应用
animationClip.addTrack(track);
// animationClip.wrapMode = AnimationClip.WrapMode.Loop;

console.log('animationClip',animationClip)

export const tesAnimationClip = animationClip