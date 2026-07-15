---
name: lianyun-video
description: >
  【从这里开始】用 AI Agent + Remotion(写代码渲染视频)做中文知识讲解类短视频——
  炼云讲堂白板教学风、slide 驱动、16:9 横屏。入口 skill:把「选题 → 脚本 → 设计 →
  搭建」四步工作流映射到各领域 skill,并让 Agent 自己安装 Remotion。做讲解视频先读它。
  本版本不含配音 / 字幕 / 自动发布。触发:「做一条讲解视频」「lianyun 视频」。
  (Entry skill: make Chinese knowledge-explainer videos with Remotion.)
metadata: { "tags": "read-first, video, remotion, explainer, chinese, router, lianyun" }
---

# 炼云视频 · 从这里开始 (start here)

用 **Remotion**(写 React 代码渲染视频)做**中文知识讲解类短视频**——白板教学风、slide 驱动、16:9 横屏(炼云讲堂按抖音横屏观看设计;尺寸在 `design.md` 里可改)。

这是入口 skill:它把**四步工作流**映射到领域 skill,并要求 agent **自己安装 Remotion**(不预装代码库,门槛最低)。

> **本版本聚焦「画面 + 脚本」。配音(TTS)、字幕、自动发布不在范围内**——slide 时长由脚本显式指定,不依赖音频对齐。这些能力后续可扩展。

---

## 能力地图 · 领域 skill(按需读)

| 你要做的事 | 读这个 skill |
|---|---|
| 装 Remotion、搭工程、写 composition、渲染出 MP4 / 静帧 | **`lianyun-video-core`** |
| 选题 → agent 查资料 → 苏格拉底式对话 → research → 写 slide 脚本 | **`lianyun-video-content`** |
| 建你自己的设计系统 `design.md`、视觉硬标准、slide 与动画规范 | **`lianyun-video-design`** |

---

## 四步工作流

1. **选题 + 脚本** → `lianyun-video-content`
   选一个值得讲的概念,让 agent 查资料、跟你苏格拉底式对话逼出 `research.md`,再落成 slide 脚本。

2. **设计系统** → `lianyun-video-design`
   **第一次**用这套 skill,先建一份 `design.md`(你的视觉与叙事 DNA);之后每条视频复用同一份。

3. **搭建 + 渲染** → `lianyun-video-core`
   agent 装 Remotion、按脚本和 `design.md` 搭 composition、渲染出 MP4 和静帧。

4. **审查** → `lianyun-video-core` 里的 QA 清单
   逐 slide 抽帧,查 overflow / 曲线压字 / 换行漂移 / 首帧可分享。

> 顺序不是铁律。已有工程和 `design.md` 时,日常就是「content 写脚本 → core 搭建渲染 → 审查」的循环。

---

## 配套第三方 skill · agent 开工前先自举

这套工作流依赖三个现成 skill——**引用,不搬运**(也在仓库根 `skills-lock.json` 里声明)。**skills.sh 装本 skill 时不会自动带上它们**,所以 **agent 开工前先确认在不在、缺哪个就装哪个**(全局,已装则是 no-op):

```bash
npx -y skills add remotion-dev/skills -g -s remotion-best-practices -y   # Remotion 官方最佳实践
npx -y skills add op7418/Humanizer-zh -g --all                          # 中文去 AI 腔(脚本必过)
npx -y skills add pbakaus/impeccable -g --all                          # 视觉打磨
```

- **`remotion-best-practices`** —— 搭 composition 时对照。
- **`humanizer-zh`** —— **「去 AI 腔」这一步必做,工具可选**:装了就用它过一遍,没装就手动对照它的规则(见 `lianyun-video-content` 第 4 节)。
- **`impeccable`** —— 调 slide 细节、想把视觉做狠时用。

> 人类用户想一次性预装,也可以跑仓库根的 `install.sh`。

---

## 给 agent:第一步怎么走

- 项目里**还没有 Remotion 工程** → 先读 `lianyun-video-core`,把基建搭起来。
- **还没有 `design.md`** → 先读 `lianyun-video-design`,建一份设计系统。
- **两者都有了** → 读 `lianyun-video-content` 定选题、写脚本,再回 `lianyun-video-core` 搭建渲染。

不确定下一步 → 回到本文件的「四步工作流」对照当前手里有什么。
