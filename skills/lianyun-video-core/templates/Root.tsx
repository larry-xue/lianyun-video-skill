// src/Root.tsx — 注册所有 composition。每条视频加一个 <Composition>。
// 别忘了 src/index.ts 里 registerRoot(RemotionRoot)（hello-world 模板已有）。
import React from "react";
import { Composition } from "remotion";
import { DemoVideo, durationInFrames } from "./videos/demo";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="demo"
      component={DemoVideo}
      durationInFrames={durationInFrames}
      fps={30}
      width={1920}
      height={1080}
    />
    {/* 新视频:再加一个 <Composition id="..." .../> */}
  </>
);
