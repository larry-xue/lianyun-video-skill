import React from "react";
import {Composition} from "remotion";
import {
  TokenExplainer,
  durationInFrames as tokenExplainerDurationInFrames,
} from "./videos/token-explainer";
import {Hero, durationInFrames as heroDurationInFrames} from "./videos/hero";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="token-explainer"
      component={TokenExplainer}
      durationInFrames={tokenExplainerDurationInFrames}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="hero"
      component={Hero}
      durationInFrames={heroDurationInFrames}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
