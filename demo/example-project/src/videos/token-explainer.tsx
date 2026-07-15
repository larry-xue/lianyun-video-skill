import React from "react";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {TransitionSeries, springTiming} from "@remotion/transitions";
import {slide} from "@remotion/transitions/slide";
import {SlideFrame} from "../components/SlideFrame";
import {Kicker, TokenPill} from "../components/slides";
import {COLORS, bodyFont, monoFont} from "../theme";

const FPS = 30;
const TRANS = 18;

const useEnter = (delayFrames = 0, x = 0, y = 36) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame: frame - delayFrames, fps, config: {damping: 18, stiffness: 150}});
  return {
    opacity: progress,
    transform: `translate(${interpolate(progress, [0, 1], [x, 0])}px, ${interpolate(progress, [0, 1], [y, 0])}px)`,
  };
};

const HookSlide: React.FC = () => (
  <SlideFrame sectionLabel="01 / HOOK" page="01 / 03">
    <div style={{height: "100%", display: "grid", gridTemplateColumns: "850px 1fr", gap: 70, alignItems: "center"}}>
      <div>
        <Kicker>你以为模型在“读字”？</Kicker>
        <div style={{fontSize: 92, fontWeight: 900, lineHeight: 1.12, marginTop: 28, letterSpacing: -3}}>
          大模型看到的，<br />
          不是<span style={{color: COLORS.accent}}>「你好」</span>
        </div>
        <div style={{fontSize: 34, color: COLORS.textSecondary, marginTop: 30, lineHeight: 1.5}}>
          它先把文字切成小块，再换成编号。
        </div>
      </div>
      <div style={{height: 500, position: "relative", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div style={{position: "absolute", width: 420, height: 420, borderRadius: "50%", background: COLORS.accentSoft, border: `5px solid ${COLORS.accent}`, boxShadow: "12px 14px 0 rgba(37,40,45,0.10)"}} />
        {["你", "好", "！"].map((t, i) => (
          <div key={t} style={{position: "relative", margin: "0 7px", padding: "14px 16px", borderRadius: 13, background: COLORS.paper, border: `3px solid ${COLORS.primary}`, fontSize: 42, fontWeight: 900, transform: `rotate(${[-8, 5, 10][i]}deg)`}}>
            {t}
            <div style={{fontFamily: monoFont, fontSize: 17, color: COLORS.primary, marginTop: 8, fontVariantNumeric: "tabular-nums"}}>#{[38220, 53901, 0][i]}</div>
          </div>
        ))}
      </div>
    </div>
  </SlideFrame>
);

const Pizza: React.FC = () => (
  <div style={{width: 420, height: 420, borderRadius: "50%", background: "conic-gradient(from 0deg, #FFBE55 0 24%, #FFF3CB 24% 26%, #FFBE55 26% 49%, #FFF3CB 49% 51%, #FFBE55 51% 74%, #FFF3CB 74% 76%, #FFBE55 76% 100%)", border: "24px solid #D88B3B", boxShadow: "10px 12px 0 rgba(37,40,45,0.10)", position: "relative"}}>
    {[[110, 86], [270, 105], [145, 255], [282, 284], [220, 190]].map(([left, top], i) => (
      <div key={i} style={{position: "absolute", left, top, width: 42, height: 42, borderRadius: "50%", background: COLORS.accent, border: "4px solid #B84528"}} />
    ))}
  </div>
);

const AnalogySlide: React.FC = () => {
  const pizzaEnter = useEnter(0, -60, 0);
  const tokensEnter = useEnter(12, 70, 0);
  return (
    <SlideFrame sectionLabel="02 / 类比" page="02 / 03">
      <div style={{fontSize: 68, fontWeight: 900, lineHeight: 1.15}}>
        token，就像<span style={{color: COLORS.accent}}>披萨切块</span>
      </div>
      <div style={{fontSize: 30, color: COLORS.textSecondary, marginTop: 16}}>tokenizer 先切，再交给模型处理。</div>
      <div style={{display: "grid", gridTemplateColumns: "500px 120px 1fr", alignItems: "center", height: 560}}>
        <div style={{...pizzaEnter, display: "flex", justifyContent: "center"}}><Pizza /></div>
        <div style={{fontSize: 70, color: COLORS.primary, fontWeight: 900}}>→</div>
        <div style={{...tokensEnter, display: "flex", flexWrap: "wrap", gap: 18, alignContent: "center"}}>
          <TokenPill text="大" id={305} />
          <TokenPill text="模型" id={7421} tone="orange" />
          <TokenPill text="里的" id={1884} />
          <TokenPill text="token" id={5963} tone="orange" />
          <div style={{width: "100%", fontSize: 25, color: COLORS.textSecondary, marginTop: 10}}>示意切法：每个 tokenizer 可能切得不同</div>
        </div>
      </div>
    </SlideFrame>
  );
};

const WhySlide: React.FC = () => {
  const frame = useCurrentFrame();
  const titleEnter = useEnter(0, 0, 30);
  const flowEnter = useEnter(10, -50, 0);
  const fill = interpolate(frame, [24, 80], [0, 0.72], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <SlideFrame sectionLabel="03 / 为什么重要" page="03 / 03">
      <div style={titleEnter}>
        <div style={{fontSize: 67, fontWeight: 900}}>模型处理的，是一串 token ID</div>
        <div style={{fontSize: 30, color: COLORS.textSecondary, marginTop: 15}}>于是，token 数会占用上下文容量，也常被用来计费。</div>
      </div>
      <div style={{...flowEnter, marginTop: 58, height: 240, borderRadius: 24, background: COLORS.paper, border: `3px solid ${COLORS.divider}`, display: "flex", alignItems: "center", padding: "30px 36px", gap: 26}}>
        {[["你", 38220], ["好", 53901], ["！", 0]].map(([text, id], i) => (
          <React.Fragment key={String(text)}>
            <TokenPill text={String(text)} id={Number(id)} tone={i === 1 ? "orange" : "blue"} />
            {i < 2 ? <span style={{fontSize: 42, color: COLORS.textSecondary}}>→</span> : null}
          </React.Fragment>
        ))}
        <div style={{marginLeft: 20, padding: "34px 30px", borderRadius: 18, background: COLORS.dark, color: "white", fontSize: 31, fontWeight: 800}}>大模型</div>
      </div>
      <div style={{marginTop: 48}}>
        <div style={{display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700, marginBottom: 13}}>
          <span>上下文窗口</span><span style={{fontFamily: monoFont, fontVariantNumeric: "tabular-nums", color: COLORS.primary}}>token 容量</span>
        </div>
        <div style={{height: 74, borderRadius: 18, background: COLORS.primarySoft, border: `3px solid ${COLORS.primary}`, overflow: "hidden"}}>
          <div style={{width: `${fill * 100}%`, height: "100%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 22, color: "white", fontFamily: monoFont, fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums"}}>
            {Math.round(fill * 100)}%
          </div>
        </div>
      </div>
    </SlideFrame>
  );
};

const SLIDES = [
  {sec: 5, node: <HookSlide />},
  {sec: 5, node: <AnalogySlide />},
  {sec: 6, node: <WhySlide />},
];

export const durationInFrames = SLIDES.reduce((sum, item) => sum + item.sec * FPS, 0) - (SLIDES.length - 1) * TRANS;

export const TokenExplainer: React.FC = () => (
  <AbsoluteFill style={{fontFamily: bodyFont, background: COLORS.bg}}>
    <TransitionSeries>
      {SLIDES.map((item, index) => (
        <React.Fragment key={index}>
          <TransitionSeries.Sequence durationInFrames={item.sec * FPS}>{item.node}</TransitionSeries.Sequence>
          {index < SLIDES.length - 1 ? (
            <TransitionSeries.Transition
              presentation={slide({direction: "from-bottom"})}
              timing={springTiming({config: {damping: 200}, durationInFrames: TRANS})}
            />
          ) : null}
        </React.Fragment>
      ))}
    </TransitionSeries>
  </AbsoluteFill>
);
