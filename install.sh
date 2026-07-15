#!/usr/bin/env bash
# 一键全局安装 lianyun-video-skill + 它依赖的第三方 skill。
# 依赖也在仓库的 skills-lock.json 里声明了;在仓库目录内跑
#   npx skills experimental_install
# 可用原生声明式方式(项目级)恢复同样这 3 个依赖。
#
# 用法:
#   bash install.sh
# 或(仓库发布后)远程一行:
#   bash <(curl -fsSL https://raw.githubusercontent.com/larry-xue/lianyun-video-skill/main/install.sh)
set -euo pipefail

echo "▶ 安装 lianyun-video-skill(4 个 skill)…"
npx -y skills add larry-xue/lianyun-video-skill -g --all

echo "▶ 安装依赖的第三方 skill(与 skills-lock.json 一致)…"
npx -y skills add remotion-dev/skills -g -s remotion-best-practices -y   # Remotion 官方最佳实践(只装这一个)
npx -y skills add op7418/Humanizer-zh -g --all                          # 中文去 AI 腔
npx -y skills add pbakaus/impeccable -g --all                          # 视觉打磨

echo "✅ 全部装好。对你的 Agent 说:「用 lianyun-video 做一条讲 X 的讲解视频」即可。"
