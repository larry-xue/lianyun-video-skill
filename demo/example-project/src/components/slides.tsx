import React from "react";
import {COLORS, monoFont} from "../theme";

export const TokenPill: React.FC<{
  text: string;
  id: number;
  tone?: "blue" | "orange";
}> = ({text, id, tone = "blue"}) => {
  const color = tone === "orange" ? COLORS.accent : COLORS.primary;
  const soft = tone === "orange" ? COLORS.accentSoft : COLORS.primarySoft;
  return (
    <div style={{display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", border: `3px solid ${color}`, background: soft, borderRadius: 16}}>
      <span style={{fontSize: 36, fontWeight: 800}}>{text}</span>
      <span style={{fontFamily: monoFont, fontSize: 22, color, fontVariantNumeric: "tabular-nums"}}>#{id}</span>
    </div>
  );
};

export const Kicker: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{display: "inline-flex", padding: "9px 16px", borderRadius: 999, background: COLORS.accentSoft, color: COLORS.accent, fontSize: 25, fontWeight: 800}}>
    {children}
  </div>
);
