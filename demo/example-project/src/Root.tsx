import React from "react";
import {Composition} from "remotion";
import {
  TokenExplainer,
  durationInFrames as tokenExplainerDurationInFrames,
} from "./videos/token-explainer";

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
  </>
);
