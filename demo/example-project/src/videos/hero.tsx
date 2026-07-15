import React from "react";
import {SlideFrame} from "../components/SlideFrame";
import {COLORS, bodyFont, monoFont} from "../theme";

export const durationInFrames = 1;

type Step = {
  number: string;
  title: string;
  caption: string;
  artifact: string;
  tone: "blue" | "orange";
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "选题",
    caption: "找到一个\n值得讲清的概念",
    artifact: "QUESTION",
    tone: "orange",
  },
  {
    number: "02",
    title: "研究",
    caption: "查资料、追问，\n直到真正想明白",
    artifact: "research.md",
    tone: "blue",
  },
  {
    number: "03",
    title: "设计",
    caption: "沉淀视觉风格\n与叙事 DNA",
    artifact: "design.md",
    tone: "orange",
  },
  {
    number: "04",
    title: "搭建",
    caption: "用 React 组装\n每一张 slide",
    artifact: "Remotion",
    tone: "blue",
  },
  {
    number: "05",
    title: "审查",
    caption: "逐 slide 抽帧，\n查首帧与溢出",
    artifact: "逐 slide QA",
    tone: "orange",
  },
];

const Arrow: React.FC = () => (
  <div
    aria-hidden="true"
    style={{
      width: 79,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <svg width="70" height="34" viewBox="0 0 70 34">
      <circle cx="6" cy="17" r="5" fill={COLORS.accent} />
      <path
        d="M 12 17 H 57"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 52 8 L 63 17 L 52 26"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const StepCard: React.FC<{step: Step}> = ({step}) => {
  const color = step.tone === "orange" ? COLORS.accent : COLORS.primary;
  const soft = step.tone === "orange" ? COLORS.accentSoft : COLORS.primarySoft;

  return (
    <div
      style={{
        width: 292,
        height: 324,
        flexShrink: 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: 24,
        border: `3px solid ${color}`,
        background: COLORS.paper,
        padding: "26px 25px 24px",
        boxShadow: `9px 11px 0 ${soft}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: monoFont,
            color,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: 1.5,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          STEP {step.number}
        </span>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 0 7px ${soft}`,
          }}
        />
      </div>

      <div
        style={{
          marginTop: 27,
          fontSize: 52,
          lineHeight: 1,
          fontWeight: 900,
          letterSpacing: -2,
          color: COLORS.text,
        }}
      >
        {step.title}
      </div>

      <div
        style={{
          marginTop: 19,
          whiteSpace: "pre-line",
          fontSize: 25,
          lineHeight: 1.5,
          fontWeight: 600,
          color: COLORS.textSecondary,
        }}
      >
        {step.caption}
      </div>

      <div
        style={{
          marginTop: "auto",
          alignSelf: "flex-start",
          borderRadius: 999,
          border: `2px solid ${color}`,
          background: soft,
          color,
          padding: "8px 13px",
          fontFamily: monoFont,
          fontSize: 18,
          lineHeight: 1,
          fontWeight: 800,
          whiteSpace: "nowrap",
        }}
      >
        {step.artifact}
      </div>
    </div>
  );
};

export const Hero: React.FC = () => (
  <SlideFrame sectionLabel="LIANYUN VIDEO / WORKFLOW" page="README / HERO">
    <div style={{height: "100%", fontFamily: bodyFont}}>
      <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 72,
              lineHeight: 1.08,
              fontWeight: 900,
              letterSpacing: -3,
              color: COLORS.text,
            }}
          >
            <span style={{color: COLORS.primary}}>lianyun-video</span>
            <span style={{color: COLORS.accent}}> · </span>
            用 Agent + Remotion 做讲解视频
          </h1>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: 29,
              lineHeight: 1.45,
              color: COLORS.textSecondary,
              fontWeight: 600,
            }}
          >
            从一个值得讲的概念，到一条可逐页审查的 16:9 知识视频。
          </p>
        </div>
        <div
          style={{
            marginBottom: 4,
            padding: "11px 16px",
            borderRadius: 10,
            background: COLORS.dark,
            color: COLORS.paper,
            fontFamily: monoFont,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1,
            whiteSpace: "nowrap",
          }}
        >
          AGENT → SLIDES → VIDEO
        </div>
      </div>

      <div
        style={{
          marginTop: 54,
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {STEPS.map((step, index) => (
          <React.Fragment key={step.number}>
            <StepCard step={step} />
            {index < STEPS.length - 1 ? <Arrow /> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  </SlideFrame>
);
