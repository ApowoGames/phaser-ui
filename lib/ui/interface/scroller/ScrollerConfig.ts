import { ISoundConfig, ISoundGroup } from "../sound/ISoundConfig";

export interface ScrollerConfig {
    x: number;
    y: number;
    clickX: number;
    clickY: number;
    width: number;
    height: number;
    /**
     * [bound0;bound1]
     */
    bounds: number[];
    /**
     * scoller 初始化时在bound0 / bound1
     */
    value: number;
    /**
     * 0 vertical / 1 horizontal
     */
    orientation?: number;
    threshold?: number; // 滚动延时 0为立刻滚动
    interactivedisDetection?: number; // 子对象交互事件派发 最大检测范围，如果up和down两次的pointer超过该距离就不会发送子对象事件
    slidingDeceleration?: number; // 拖动释放时是否减慢速度时间
    backDeceleration?: number; //  拖出视口范围的弹性效果时间
    enable?: boolean; // 是否能拖动
    /**
     * 0 点击音效  1滚动音效
     */
    music?: ISoundGroup;
    valuechangeCallback?: Function; // 滚动条位置发生变化返回事件
    valuechangeCallbackScope?: Function; //
    overminCallback?: Function; // 超出视口最小范围返回事件
    overminCallbackScope?: Function;
    overmaxCallBack?: Function; // 超出视口最大范围返回事件
    overmaxCallBackScope?: Function;
    celldownCallBack?: Function; // 子对象pointerdown 事件 可以把点击的对象抛出
    cellupCallBack?: Function; // 子对象pointerup 事件 可以把点击的对象抛出
}
