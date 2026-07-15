// src/theme.ts — 把 design.md 里的视觉 DNA 落成常量。改这里 = 改全片。
// 下面是「炼云讲堂」示例配色,请按你自己的 design.md 替换。
import { loadFont as loadBody } from "@remotion/google-fonts/NotoSansSC";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

export const { fontFamily: bodyFont } = loadBody();
export const { fontFamily: monoFont } = loadMono();

export const COLORS = {
  primary: "#2D5AF0", // 主蓝:inset 块 / eyebrow / 主强调
  accent: "#FF6B35", // 强调橙:数字 / 高亮 / kicker
  text: "#2C2C2C", // 正文
  textSecondary: "#6B7280", // 注释 / 副标题 / footer
  bg: "#F5F2EB", // 米白纸
  divider: "#D1D5DB", // 卡片边框 / 分隔线
};

export const BRAND = {
  handle: "@你的账号", // 右上角方框
  series: "KNOWLEDGE", // 顶栏系列名
  footer: "YOURBRAND", // 底栏
};
