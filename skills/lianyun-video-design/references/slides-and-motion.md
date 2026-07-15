# Slide 版式、转场、揭示、持续动画

> 本版本无配音:节奏由**帧**驱动(每个 slide 显式帧长,slide 内元素按帧延迟揭示),不做音频对齐。

## 转场

- **只用** `TransitionSeries` + `slide({ direction: "from-bottom" })`。
- **禁止**旋转 / 翻页 / 百叶窗 / 时钟擦除等纯装饰转场。
- 转场重叠 `TRANS` 帧(~0.6s),总时长按 `(N-1)*TRANS` 补偿(见 core 的公式)。

## 两条铁律(踩过的坑)

1. **第一张 slide 第一帧必须完全可见**——不加任何入场动画。平台用首帧做分享封面,入场动画会让封面变空白。后续 slide 可以有 spring 入场。
2. **根 `AbsoluteFill` 必须带 `background`**,否则转场时边缘露黑边。

## 逐步揭示(无配音版)

slide 内多个要点时,不要一次全 stagger 进场——按**帧延迟**逐条出现,跟着你想要的节奏:

```tsx
// 第 i 个要点延迟 i*10 帧入场
const useEnter = (delayFrames = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delayFrames, fps, config: { damping: 18, stiffness: 160 } });
  return { opacity: p, transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)` };
};
```

> 想跟真人配音逐字揭示,需要 TTS + 字级时间戳——那是后续扩展,不在本版本。

## 何时让画面持续动

**先问两个问题:**
1. 这内容有没有「量」或「过程」?(数字大小、比例、增长、步骤)
2. 去掉动画只看静止帧,信息量有没有减少?没减少 → 动画是装饰,可删;减少了 → 它在服务理解,做。

**触发条件(看到就考虑持续动画):**
- 数量对比(大 vs 小)→ 让大小可见,不只是数字。
- 占比 / 百分比 / 容量 → 填充动画。
- 增长 / 趋势 → 生长曲线 / 增长柱(例:一根从 0 长到铺满的柱子,比静态 `200K` 直觉)。
- 流程 / 步骤 / 因果链 → 逐段画出的连接线。
- 代码逐行讲解 → 高亮行跟着节奏移动。

**动画多样性**:别每张都用同一个 translateY;交替 scaleUp / slideLeft / slideRight,数据 slide 用 count-up 或 bar 填充。多样是目的,不是规则。

## 版式建议(可扩展)

标题页 / 要点列表 / 左右对比 / 数据柱 / 代码讲解——每类做成可复用组件放 `src/components/slides.tsx`,靠 `design.md` 的 token 统一风格。
