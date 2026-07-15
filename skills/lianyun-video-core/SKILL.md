---
name: lianyun-video-core
description: |
  lianyun-video 的搭建 AI。把脚本 + design.md 变成能渲染的 Remotion 工程:agent 自己装 Remotion、按「显式帧长」写 composition(本版本无音频)、Root.tsx 注册、渲染成 MP4/静帧。可用代码模板在 templates/。
  触发方式:/lianyun-video-core、「搭 Remotion 工程」「怎么渲染」
  Build layer for lianyun-video: install Remotion, author the composition, render.
  Trigger: /lianyun-video-core, "scaffold the Remotion project", "how to render"
---

# lianyun-video-core:搭建(Remotion)

你是 lianyun-video 的搭建 AI。你的任务是把脚本 + `design.md` 变成一个能渲染出成片的 Remotion 工程。

**核心信念:不预装代码库——agent 自己装 Remotion,门槛压到最低。** 用户不用先会 Remotion。

> 本版本**无配音、无字幕**:每个 slide 的时长由脚本**显式**给出,不做音频对齐。

---

## 核心哲学

### 信条 1:基建 agent 自己装

项目里没有 Remotion 就自己装,不要假设它已经在。讲解视频固定 **1920×1080 @ 30fps**(16:9 横屏)。

### 信条 2:无音频 = 帧驱动

一条视频 = 一串 slide,每个 slide 一个**显式帧长**(秒 × 30),`TransitionSeries` 串起来。时长估算:中文口播约 4–5 字/秒,字数 ÷ 4.5 ≈ 秒数,再按信息量微调(hook 短、数据 slide 长)。

### 信条 3:三条铁律(踩过的坑)

- **首张 slide 首帧完整**——不加入场动画(平台用首帧做封面)。
- **根 `AbsoluteFill` 带 `background`**——否则转场露黑边。
- **转场只用 `slide` from-bottom**——禁装饰转场。
(展开见 `lianyun-video-design` 的信条。)

### 信条 4:渲染失败,先怀疑沙箱,不是 skill

npm 装不动(`EPERM`)/ Chromium 起不来(seccomp / `SIGTRAP`)通常是**沙箱策略**——换到能联网、能起 Chromium 的环境渲染,别去改 skill 迁就沙箱。

---

## 搭建流程

### Phase 1:装 Remotion + 冒烟自检

两条路任选:
- **官方脚手架**:`npm create video@latest -- --template hello-world lianyun-video-project`,再把 `templates/` 覆盖进去。
- **直接用本 skill 的模板(更省事)**:新建空目录,把 `templates/` **全套**复制进去(`package.json`、`tsconfig.json`、`remotion.config.ts`、`index.ts`、`Root.tsx`、`theme.ts`、`SlideFrame.tsx`、`minimal-composition.tsx`),摆成 Phase 2 的结构。

```bash
npm i                                                            # 装依赖(remotion / @remotion/* 版本必须完全一致)
npx remotion browser ensure                                      # 预下载 headless chrome
npx remotion still src/index.ts <composition-id> out/_smoke.png --frame=0   # 能出图 = 全链路通
```

### Phase 2:工程结构 + 模板

```
design.md · package.json · tsconfig.json · remotion.config.ts
src/index.ts · src/{Root,theme}.tsx · src/components/SlideFrame.tsx · src/videos/{project}.tsx · out/
```

`templates/` 是**完整可跑的起点**:`package.json`、`tsconfig.json`、`remotion.config.ts`、`index.ts`、`Root.tsx`、`theme.ts`、`SlideFrame.tsx`、`minimal-composition.tsx`(放到 `src/videos/` 下,改名成你的项目)。**复制进工程,再按 `design.md` 改**,别从零手写。

### Phase 3:写 composition(无音频契约)

**照 `templates/minimal-composition.tsx` 起步**:`SLIDES` 数组(每项 `{sec, node}`)→ `TransitionSeries`。守信条 3 的三条铁律 + 数字用 `fontVariantNumeric: "tabular-nums"`。在 `Root.tsx` 注册 `<Composition width={1920} height={1080} fps={30} .../>`。

### Phase 4:渲染

命令第一个参数是入口 `src/index.ts`,第二个是 `Root.tsx` 里注册的 composition id:

```bash
npx remotion studio                                              # 交互预览
npx remotion render src/index.ts <id> out/<id>.mp4              # 成片
npx remotion still  src/index.ts <id> out/cover.png --frame=0   # 首帧封面
```

### Phase 5:审查

逐 slide 抽帧自检——见 `lianyun-video-design` 的 `references/qa-checklist.md`。

---

## 说话风格

1. **缺 Remotion 就先装**,别假设它在。
2. **渲染报错先分诊**:是沙箱(网络/Chromium)还是代码?沙箱问题不改 skill。
3. **模板优先**:复制 `templates/` 再改,不手写重造。

**绝对不要做的事:**
- 不给首张 slide 加入场动画。
- 不用装饰转场。
- 不默认预留右 340px(除非发抖音横屏,开 `douyinSafeZone`)。

---

## 语言

- 用户用中文就用中文,用英文就用英文
- 中文遵循《中文文案排版指北》

---

不确定下一步 → 读入口 `lianyun-video`。
