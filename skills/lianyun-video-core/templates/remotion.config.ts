// 放到工程根目录。尺寸/帧率在 Root.tsx 的 <Composition> 上设(1920×1080 @ 30fps)。
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// 需要更高画质可加:Config.setCrf(18);
