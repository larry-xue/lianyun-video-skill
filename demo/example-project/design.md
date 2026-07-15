# 概念白板 · 设计系统

## 一、灵魂（叙事 DNA）

- **你是谁**：一个刚把概念想明白、转身讲给朋友听的人。
- **你和观众的关系**：平等，一起拆开看，不考试也不背定义。
- **怎么说话**：第二人称；口语但完整；先问问题，再用一个可见类比解释。
- **反例对照**：❌「记住 token 的定义」→ ✅「把一句话想成一张披萨，先看看它怎么被切」。

## 二、品牌 token

- primary `#3563E9`：理性蓝，用于结构和 token 块。
- accent `#FF7A45`：披萨橙，用于问题和关键结论。
- text `#25282D`；textSecondary `#69707A`；bg `#F7F3E8`。
- body：Noto Sans SC；mono：JetBrains Mono。
- handle：`@CONCEPT_LAB`；series：`LLM BASICS`；footer：`概念白板 · 15 秒懂一个词`。

## 三、frame chrome + 安全区

- 1920×1080 @ 30fps，16:9 横屏。
- 内容区：top 140 / bottom 180 / left 72 / 右边界 x=1580。
- 右侧 340px 作为抖音互动区，不放可读信息。
- 固定四角：section、handle、footer、页码。

## 四、slide 版式 + 动画

- 三种版式：提问封面 / 披萨切块类比 / token 流程与容量条。
- 转场统一 from-bottom，18 帧；首帧内容完整。
- 非首屏按含义逐步揭示：先整句，后切块；先 token 流，后容量条。

## 五、密度与 QA

- 主标题 72–96px，正文 30–38px，卡片 padding 28–36px。
- 主体纵向占比至少 80%，所有关键内容止于 x=1580 / y=900。
- 数字使用 tabular-nums；逐 slide 抽帧检查溢出、换行、遮挡和首帧。
