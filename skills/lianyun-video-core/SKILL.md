---
name: lianyun-video-core
description: >
  炼云讲解视频的技术契约:装 Remotion、搭工程、用「显式 slide 帧长」写 composition
  (本版本无配音 / 音频对齐)、在 Root.tsx 注册、渲染成 MP4 / 静帧。写 composition
  代码前先读。模板在 templates/。视觉标准配合 lianyun-video-design。
  (Remotion setup + composition contract for a 炼云 explainer video.)
metadata: { "tags": "remotion, setup, composition, render, lianyun" }
---

# 炼云视频 · 核心搭建 (Remotion)

这套 skill 教 agent **从零搭一个 Remotion 讲解视频工程并渲染**。视觉标准在 `lianyun-video-design`,选题脚本在 `lianyun-video-content`,这里只管**怎么把脚本变成能渲染的 Remotion 工程**。

> 本版本**无配音、无字幕**:每个 slide 的时长由脚本**显式**给出(秒或帧),不做 whisper 音频对齐。这让门槛最低、也最可控。想加配音字幕是后续扩展。

---

## 0. 前置:agent 自己装 Remotion

项目里没有 Remotion 就先装(不要预期它已经在):

```bash
# 新工程(推荐):官方脚手架,选 "Hello World" TS 模板
npm create video@latest -- --template hello-world lianyun-video-project
cd lianyun-video-project

# 或在已有 Node 工程里手动加依赖
npm i remotion @remotion/cli @remotion/transitions @remotion/google-fonts
```

讲解视频固定用 **1920×1080 @ 30fps**(16:9 横屏)。内容区**默认左右对称满宽**(视觉均衡);**只有专门发抖音横屏**时,才给 `SlideFrame` 传 `douyinSafeZone` 预留右侧 340px 互动区——否则默认就好,别留那段右空白(会像宽度 bug)。尺寸可在 `design.md` 里改。`remotion.config.ts` 见 `templates/remotion.config.ts`。

渲染需要 Chrome/Chromium,Remotion 首次渲染会自动下载 headless shell;CI/无头环境按官方文档装系统依赖。

**环境自检(受限沙箱先做):** 有些沙箱会封 npm registry 或 Chromium。装完先跑一次预检,早点暴露问题:

```bash
npx remotion browser ensure     # 预下载 headless chrome
# 冒烟:任一 composition 出一张图,能出就说明「打包→渲染→Chromium」全链路通
npx remotion still src/index.ts <composition-id> out/_smoke.png --frame=0
```

npm 装不动(`EPERM` 等)或 Chromium 起不来(seccomp / `SIGTRAP`)通常是**沙箱策略,不是 skill 问题**——换到能联网、能起 Chromium 的环境渲染。

---

## 1. 工程结构

```
lianyun-video-project/
├── design.md                      # 你的设计系统(由 lianyun-video-design 生成,必读)
├── remotion.config.ts
├── src/
│   ├── Root.tsx                   # 注册所有 composition
│   ├── theme.ts                   # 从 design.md 落地的 COLORS / FONT / BRAND 常量
│   ├── components/
│   │   ├── SlideFrame.tsx         # 统一 frame chrome(安全区、页码、brand tag)
│   │   └── slides.tsx             # 可复用 slide 版式(标题/要点/对比/数据…)
│   └── videos/
│       └── {project}.tsx          # 每条视频一个 composition,自包含
└── out/                           # 渲染产物
```

`templates/` 里给了 `Root.tsx`、`remotion.config.ts`、`SlideFrame.tsx`、`minimal-composition.tsx` 的可用起点——复制进工程再按 `design.md` 改。

---

## 2. Composition 契约(无音频版)

**核心思想:一条视频 = 一串 slide,每个 slide 有显式帧长,`TransitionSeries` 串起来。**

```tsx
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { SlideFrame } from "../components/SlideFrame";
import { COLORS, bodyFont } from "../theme";

// 每个 slide:内容组件 + 秒数。30fps → durationInFrames = seconds * 30
const SLIDES = [
  { sec: 4,  node: <HookSlide /> },
  { sec: 6,  node: <PointSlide /> },
  { sec: 5,  node: <DataSlide /> },
];

const FPS = 30;
const TRANS = 18; // 转场重叠帧,~0.6s

export const durationInFrames =
  SLIDES.reduce((a, s) => a + s.sec * FPS, 0) - (SLIDES.length - 1) * TRANS;

export const MyVideo = () => (
  <AbsoluteFill style={{ fontFamily: bodyFont, background: COLORS.bg }}>
    <TransitionSeries>
      {SLIDES.map((s, i) => (
        <React.Fragment key={i}>
          <TransitionSeries.Sequence durationInFrames={s.sec * FPS}>
            {s.node}
          </TransitionSeries.Sequence>
          {i < SLIDES.length - 1 && (
            <TransitionSeries.Transition
              presentation={slide({ direction: "from-bottom" })}
              timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANS })}
            />
          )}
        </React.Fragment>
      ))}
    </TransitionSeries>
  </AbsoluteFill>
);
```

**硬规则(照抄,踩过的坑):**

1. **第一张 slide 第一帧必须完全可见**——不加任何入场动画。竖屏平台用首帧做分享封面,入场动画会让封面变空白。后续 slide 可以有 spring 入场。
2. **根 `AbsoluteFill` 必须带 `background`**,否则转场时边缘露黑边。
3. **转场只用 `slide({ direction: "from-bottom" })`**——禁止旋转 / 翻页 / 百叶窗等装饰转场。
4. **最后一张 slide 补回被转场吃掉的帧**:`durationInFrames` 公式里已减去 `(N-1)*TRANS`,若用逐帧精确控制,最后一张单独加回。
5. **数字用 `fontVariantNumeric: "tabular-nums"`** 等宽对齐。
6. 时长估算:中文口播约 **4–5 字/秒**。一个 slide 的字数 ÷ 4.5 ≈ 秒数,再按信息量微调(hook 短、数据 slide 长)。

`Root.tsx` 里注册:

```tsx
<Composition
  id="my-video"
  component={MyVideo}
  durationInFrames={durationInFrames}
  fps={30}
  width={1920}
  height={1080}
/>
```

---

## 3. 渲染

```bash
npx remotion studio                      # 交互预览、调视觉
npx remotion render my-video out/my-video.mp4          # 渲成 MP4
npx remotion still my-video out/cover.png --frame=0     # 首帧做封面
```

批量抽静帧自检(比只看一帧可靠):

```bash
# 每 ~2s 抽一帧,肉眼过 overflow / 压字 / 换行漂移
for f in 0 60 120 180 240 300; do npx remotion still my-video out/f_$f.png --frame=$f; done
```

---

## 4. 提交前 QA(必过)

- [ ] `npx tsc --noEmit` 类型通过
- [ ] 逐 slide 抽帧:正文没溢出安全区、SVG label 没压数据线、相邻帧换行不漂移
- [ ] 首帧(frame 0)干净可做封面
- [ ] 内容左右均衡,右侧没有大段空白(仅当 `douyinSafeZone=true` 才应有右 340px 留白)
- [ ] 脚本已过「去 AI 腔」(`humanizer-zh` 或手动对照其规则)

细节标准(安全区尺寸、密度、动画触发)在 `lianyun-video-design/references/`。
