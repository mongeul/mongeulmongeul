"use client";

import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function Canvas({ brushColor }: { brushColor: string }) {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvasInstance = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    import("fabric").then(({ Canvas }) => {
      if (!canvasEl.current) return;

      // 기존 Canvas가 있으면 초기화하지 않음
      if (canvasInstance.current) return;

      // Fabric.js Canvas 인스턴스 생성
      const options = {
        isDrawingMode: true, // 드로잉 모드 활성화
        backgroundColor: "#ffffff",
      };

      const newCanvas = new Canvas(canvasEl.current, options);
      canvasInstance.current = newCanvas; // Canvas 인스턴스 저장

      return () => {
        newCanvas.dispose();
        canvasInstance.current = null;
      };
    });
  }, []);

  // 브러시 색상 변경 적용
  useEffect(() => {
    if (canvasInstance.current) {
      canvasInstance.current.isDrawingMode = true; // 드로잉 모드 유지
      if (!canvasInstance.current.freeDrawingBrush) {
        canvasInstance.current.freeDrawingBrush = new fabric.PencilBrush(
          canvasInstance.current
        );
      }
      canvasInstance.current.freeDrawingBrush.color = brushColor; // 브러시 색상 적용
    }
  }, [brushColor]); // brushColor가 변경될 때마다 실행

  return <canvas width="300" height="300" ref={canvasEl} className="border" />;
}
