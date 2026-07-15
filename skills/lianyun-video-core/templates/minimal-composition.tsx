// src/videos/demo.tsx — 三张 slide 的最小可渲染示例。把内容换成你的脚本即可。
// 渲染:npx remotion render demo out/demo.mp4
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { SlideFrame } from "../components/SlideFrame";
import { COLORS, bodyFont } from "../theme";

const FPS = 30;
const TRANS = 18; // 转场重叠帧 ~0.6s

// 非首张 slide 的 spring 入场
const useEnter = (delayFrames = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delayFrames, fps, config: { damping: 18, stiffness: 160 } });
  return { opacity: p, transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)` };
};

// slide 1：钩子。第一帧必须完全可见——不加入场动画（平台用首帧做封面）。
const Hook: React.FC = () => (
  <SlideFrame sectionLabel="01 / HOOK" page="01 / 03">
    <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.15 }}>
      这里是<span style={{ color: COLORS.accent }}>钩子问题</span>
    </div>
    <div style={{ fontSize: 34, color: COLORS.textSecondary, marginTop: 32 }}>一句话把观众勾住,别铺垫。</div>
  </SlideFrame>
);

const PointItem: React.FC<{ i: number; text: string }> = ({ i, text }) => {
  const e = useEnter(i * 10);
  return (
    <div style={{ ...e, fontSize: 40, margin: "24px 0", display: "flex", gap: 20, alignItems: "baseline" }}>
      <span style={{ color: COLORS.primary, fontWeight: 800 }}>{i + 1}</span>
      <span>{text}</span>
    </div>
  );
};

const Points: React.FC = () => (
  <SlideFrame sectionLabel="02 / 拆解" page="02 / 03">
    <div style={{ fontSize: 56, fontWeight: 800, marginBottom: 40 }}>核心就三点</div>
    {["第一个要点", "第二个要点", "第三个要点"].map((t, i) => (
      <PointItem key={i} i={i} text={t} />
    ))}
  </SlideFrame>
);

// slide 3：数据——用一根生长的柱子代替干巴巴的数字
const DataSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <SlideFrame sectionLabel="03 / 数据" page="03 / 03">
      <div style={{ fontSize: 56, fontWeight: 800, marginBottom: 40 }}>用一根柱子代替数字</div>
      <div style={{ height: 120, width: grow * 1200, background: COLORS.primary, borderRadius: 8 }} />
      <div style={{ fontSize: 60, fontWeight: 800, fontVariantNumeric: "tabular-nums", marginTop: 28, color: COLORS.accent }}>
        {Math.round(grow * 200)}K
      </div>
    </SlideFrame>
  );
};

const SLIDES = [
  { sec: 4, node: <Hook /> },
  { sec: 6, node: <Points /> },
  { sec: 5, node: <DataSlide /> },
];

export const durationInFrames = SLIDES.reduce((a, s) => a + s.sec * FPS, 0) - (SLIDES.length - 1) * TRANS;

export const DemoVideo: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: bodyFont, background: COLORS.bg }}>
    <TransitionSeries>
      {SLIDES.map((s, i) => (
        <React.Fragment key={i}>
          <TransitionSeries.Sequence durationInFrames={s.sec * FPS}>{s.node}</TransitionSeries.Sequence>
          {i < SLIDES.length - 1 && (
            <TransitionSeries.Transition
              presentation={slide({ direction: "from-bottom" })}
              timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANS })}
            />
          )}
        </React.Fragment>
      ))}
    </TransitionSeries>
  </AbsoluteFill>
);
