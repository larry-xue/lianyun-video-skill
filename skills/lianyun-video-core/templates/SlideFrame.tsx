// src/components/SlideFrame.tsx — 统一 frame chrome(所有 slide 都包一层)。
// 画布 1920×1080。内容安全区:top 140 / bottom 180 / left 72 / 右边界 x=1580。
// 右侧 340px(1580→1920)留给抖音横屏观看时的点赞/评论/分享 UI——不放可读内容。
import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, monoFont, BRAND } from "../theme";

export const SlideFrame: React.FC<{
  sectionLabel: string; // 如 "01 / HOOK"
  page?: string; // 如 "01 / 08"
  children: React.ReactNode;
  background?: React.ReactNode; // 可选全帧背景层(渲染在纸底之下)
}> = ({ sectionLabel, page, children, background }) => (
  <AbsoluteFill style={{ background: COLORS.bg }}>
    {background}
    {/* 顶栏 section eyebrow */}
    <div style={{ position: "absolute", top: 60, left: 72, fontFamily: monoFont, color: COLORS.primary, fontSize: 26, letterSpacing: 2 }}>
      {sectionLabel}
    </div>
    {/* 右上 brand tag（在安全区左侧，避开右 340px） */}
    <div style={{ position: "absolute", top: 54, left: 1360, fontFamily: monoFont, color: COLORS.text, fontSize: 24, border: `2px solid ${COLORS.text}`, padding: "6px 14px" }}>
      {BRAND.handle}
    </div>
    {/* 内容安全区 1508×760 */}
    <div style={{ position: "absolute", top: 140, left: 72, width: 1508, height: 760, color: COLORS.text }}>
      {children}
    </div>
    {/* 底栏 footer + 页码 */}
    <div style={{ position: "absolute", bottom: 60, left: 72, fontFamily: monoFont, color: COLORS.textSecondary, fontSize: 22, letterSpacing: 3 }}>
      {BRAND.footer}
    </div>
    {page && (
      <div style={{ position: "absolute", bottom: 60, left: 1440, fontFamily: monoFont, color: COLORS.textSecondary, fontSize: 22 }}>
        {page}
      </div>
    )}
  </AbsoluteFill>
);
