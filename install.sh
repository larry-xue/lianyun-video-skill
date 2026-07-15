#!/usr/bin/env bash
# 一键安装 lianyun-video-skill + 它依赖的第三方 skill(全部装到全局 skills 目录)。
# 用法:
#   bash install.sh
# 或(仓库发布后)一行远程安装:
#   bash <(curl -fsSL https://raw.githubusercontent.com/larry-xue/lianyun-video-skill/main/install.sh)
set -euo pipefail

echo "▶ 安装 lianyun-video-skill(4 个 skill)…"
npx -y skills add larry-xue/lianyun-video-skill -g --all

echo "▶ 安装依赖的第三方 skill…"
npx -y skills add remotion-dev/skills -g --all   # Remotion 官方最佳实践
npx -y skills add op7418/Humanizer-zh -g --all   # 中文去 AI 腔
npx -y skills add pbakaus/impeccable -g --all    # 视觉打磨

echo "✅ 全部装好。对你的 Agent 说:「用 lianyun-video 做一条讲 X 的讲解视频」即可。"
