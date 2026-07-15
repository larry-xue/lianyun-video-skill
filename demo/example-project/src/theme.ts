import {loadFont as loadBody} from "@remotion/google-fonts/NotoSansSC";
import {loadFont as loadMono} from "@remotion/google-fonts/JetBrainsMono";

export const {fontFamily: bodyFont} = loadBody();
export const {fontFamily: monoFont} = loadMono();

export const COLORS = {
  primary: "#3563E9",
  primarySoft: "#DFE8FF",
  accent: "#FF7A45",
  accentSoft: "#FFE5D8",
  text: "#25282D",
  textSecondary: "#69707A",
  bg: "#F7F3E8",
  paper: "#FFFCF5",
  divider: "#CBD0D7",
  dark: "#182230",
};

export const BRAND = {
  handle: "@CONCEPT_LAB",
  series: "LLM BASICS",
  footer: "概念白板 · 15 秒懂一个词",
};
