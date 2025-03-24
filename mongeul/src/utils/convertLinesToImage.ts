import { PictureLine } from "@/types/pictureTypes";
import Konva from "konva";

export async function convertLinesToImage(
  pictureLines: PictureLine[]
): Promise<string> {
  return new Promise((resolve) => {
    // 가상 Konva Stage 생성 (DOM 없이 JS에서만 존재)
    const stage = new Konva.Stage({
      width: 768,
      height: 500,
      container: document.createElement("div"), // DOM에 추가하지 않고 메모리상에서만 사용
    });

    const layer = new Konva.Layer();

    // 그림 데이터 추가
    pictureLines.forEach((line) => {
      const konvaLine = new Konva.Line({
        points: line.points.flat(),
        stroke: line.stroke,
        strokeWidth: line.strokeWidth,
        tension: 0.5,
        lineCap: "round",
        lineJoin: "round",
      });
      layer.add(konvaLine);
    });

    stage.add(layer);

    resolve(stage.toDataURL({ mimeType: "image/png" }));
  });
}
