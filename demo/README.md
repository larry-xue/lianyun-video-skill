# Demo · 什么是 token

这个 demo 是**一次真实的 dogfood 测试**:一个完全没有上下文的 Agent(Codex)只被允许读 `lianyun-video-skill` 这套 skill,从零做出一条讲「什么是 token」的 ~15 秒讲解视频。

它自己完成了:装 Remotion → 建 `design.md`(中性品牌「概念白板」)→ 研究 + 写脚本 → 搭 composition → TypeScript 类型检查通过。渲染环节因它所在沙箱封了 Chromium 没跑成——静帧和成片是在无沙箱环境下渲染 `example-project/` 得到的。这也正好验证了 `lianyun-video-core` 里「渲染失败通常是沙箱策略、不是 skill 问题」的判断。

## 产物

- `images/` —— 三张 slide 静帧(hook / 类比 / 为什么重要)。
- `token-explainer.mp4` —— 约 15 秒成片。
- `example-project/` —— Agent 产出的完整工程源码。

## 自己复现

```bash
cd example-project
npm install
npx remotion studio                            # 交互预览
npx remotion render token-explainer out.mp4    # 渲染成片
```
