import React from "react";
import {AbsoluteFill} from "remotion";
import {BRAND, COLORS, monoFont} from "../theme";

export const SlideFrame: React.FC<{
  sectionLabel: string;
  page?: string;
  children: React.ReactNode;
}> = ({sectionLabel, page, children}) => (
  <AbsoluteFill style={{background: COLORS.bg}}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.32,
        backgroundImage: `radial-gradient(${COLORS.divider} 1.5px, transparent 1.5px)`,
        backgroundSize: "26px 26px",
      }}
    />
    <div style={{position: "absolute", top: 60, left: 72, fontFamily: monoFont, color: COLORS.primary, fontSize: 26, fontWeight: 700, letterSpacing: 2}}>
      {sectionLabel}
    </div>
    <div style={{position: "absolute", top: 54, left: 1320, fontFamily: monoFont, color: COLORS.text, fontSize: 23, border: `2px solid ${COLORS.text}`, padding: "7px 14px", background: COLORS.paper}}>
      {BRAND.handle}
    </div>
    <div style={{position: "absolute", top: 140, left: 72, width: 1508, height: 760, color: COLORS.text}}>
      {children}
    </div>
    <div style={{position: "absolute", bottom: 60, left: 72, fontFamily: monoFont, color: COLORS.textSecondary, fontSize: 22, letterSpacing: 2}}>
      {BRAND.footer}
    </div>
    {page ? (
      <div style={{position: "absolute", bottom: 60, left: 1440, fontFamily: monoFont, color: COLORS.textSecondary, fontSize: 22, fontVariantNumeric: "tabular-nums"}}>
        {page}
      </div>
    ) : null}
  </AbsoluteFill>
);
