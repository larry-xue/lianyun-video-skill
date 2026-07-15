// src/components/SlideFrame.tsx — 统一 frame chrome(所有 slide 都包一层)。
// 画布 1920×1080。**默认左右对称留白**(left/right 72,内容宽 1776),视觉均衡。
// 只有专门发「抖音横屏」时:右侧点赞/评论 UI 会盖住约 340px,给 douyinSafeZone 传 true,
// 内容缩到 1508 宽,把关键信息挡在安全线内。一般平台/独立视频保持默认满宽即可。
import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, monoFont, BRAND } from "../theme";

export const SlideFrame: React.FC<{
  sectionLabel: string; // 如 "01 / HOOK"
  page?: string; // 如 "01 / 08"
  children: React.ReactNode;
  background?: React.ReactNode; // 可选全帧背景层(渲染在纸底之下)
  douyinSafeZone?: boolean; // true = 预留右侧 340px 抖音互动区(默认 false)
}> = ({ sectionLabel, page, children, background, douyinSafeZone }) => {
  const contentWidth = douyinSafeZone ? 1508 : 1776;
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {background}
      {/* 顶栏 section eyebrow(左上角) */}
      <div style={{ position: "absolute", top: 60, left: 72, fontFamily: monoFont, color: COLORS.primary, fontSize: 26, letterSpacing: 2 }}>
        {sectionLabel}
      </div>
      {/* 右上 brand tag（右上角，随安全区收缩） */}
      <div style={{ position: "absolute", top: 54, right: douyinSafeZone ? 412 : 72, fontFamily: monoFont, color: COLORS.text, fontSize: 24, border: `2px solid ${COLORS.text}`, padding: "6px 14px" }}>
        {BRAND.handle}
      </div>
      {/* 内容安全区（默认 1776 满宽，对称留白） */}
      <div style={{ position: "absolute", top: 140, left: 72, width: contentWidth, height: 760, color: COLORS.text }}>
        {children}
      </div>
      {/* 底栏 footer + 页码 */}
      <div style={{ position: "absolute", bottom: 60, left: 72, fontFamily: monoFont, color: COLORS.textSecondary, fontSize: 22, letterSpacing: 3 }}>
        {BRAND.footer}
      </div>
      {page && (
        <div style={{ position: "absolute", bottom: 60, right: douyinSafeZone ? 412 : 72, fontFamily: monoFont, color: COLORS.textSecondary, fontSize: 22, fontVariantNumeric: "tabular-nums" }}>
          {page}
        </div>
      )}
    </AbsoluteFill>
  );
};
