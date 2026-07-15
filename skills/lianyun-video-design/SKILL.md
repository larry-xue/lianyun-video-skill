---
name: lianyun-video-design
description: >
  为炼云讲解视频建你自己的视觉 + 叙事设计系统(design.md),并给出可直接照做的硬标准:
  frame chrome 与抖音安全区、slide 版式、转场、无配音逐步揭示、动画触发条件、密度规则、
  逐 slide 抽帧 QA。新工程定风格或审查渲染结果时读。含可填的 design.md 模板 + reference。
  (Build your design.md + visual/motion/QA standards for a 炼云 explainer.)
metadata: { "tags": "design, visual-system, layout, animation, qa, lianyun" }
---

# 炼云视频 · 设计系统

一套系列视频要有**一套视觉 DNA**——观众看到任何一张 slide 都能一眼认出「这是你」。这套 skill 帮你**建自己的 `design.md`**,并给出可直接照做的硬标准。

---

## 第一次:建你的 `design.md`

把 `templates/design.template.md` 复制到工程根目录改名 `design.md`,把里面的 `[方括号]` 填成你自己的。模板分五块:

1. **灵魂**——你是谁、跟观众什么关系、怎么说话(叙事 DNA)。
2. **品牌 token**——配色、字体、handle / 系列名 / footer(落到 `src/theme.ts`)。
3. **frame chrome**——画布尺寸、安全区、四角固定元素 → `references/frame-and-density.md`。
4. **slide 版式 + 动画**——版式清单、转场、逐步揭示、何时让画面持续动 → `references/slides-and-motion.md`。
5. **密度与 QA 硬标准**——字号、留白、抽帧自检 → `references/qa-checklist.md`。

`design.md` 是这条产线的「宪法」,写脚本、搭 composition 前都先读它。

---

## 每条视频:对着标准过

- **`references/frame-and-density.md`** —— 画布、安全区(含抖音互动区)、字号与密度硬标准。
- **`references/slides-and-motion.md`** —— slide 版式、转场规则、逐步揭示、持续动画的触发条件。
- **`references/qa-checklist.md`** —— 渲染后逐 slide 抽帧自检清单。

---

## 配套 skill

- **`impeccable`**(`pbakaus/impeccable`)—— 把 slide 视觉打磨得更狠、更有品。
- **`remotion-best-practices`**(`remotion-dev/skills`)—— 渲染 / 动画层的官方最佳实践。

建自己的 design.md 时,可以让 `impeccable` 帮你审视觉层级、配色、留白。
