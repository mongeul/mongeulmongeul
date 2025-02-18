"use client";

import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

export default function Canvas({ brushColor }: { brushColor: string }) {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvasInstance = useRef<fabric.Canvas | null>(null);
  const [history, setHistory] = useState<object[]>([]); // JSON 형태로 저장
  const [redoStack, setRedoStack] = useState<object[]>([]); // Redo 히스토리
  const [isLocked, setIsLocked] = useState(false); // Redo 실행 여부 상태

  useEffect(() => {
    if (!canvasEl.current) return;

    // 기존 Canvas가 있으면 초기화하지 않음
    if (canvasInstance.current) return;

    // Fabric.js Canvas 인스턴스 생성
    const newCanvas = new fabric.Canvas(canvasEl.current, {
      isDrawingMode: true, // 드로잉 모드 활성화
      backgroundColor: "#ffffff",
    });

    canvasInstance.current = newCanvas; // Canvas 인스턴스 저장
    saveHistory(); // 초기 상태 저장

    // 변경이 생길 때마다 히스토리 저장
    newCanvas.on("object:added", saveHistory);
    newCanvas.on("object:modified", saveHistory);
    newCanvas.on("object:removed", saveHistory);

    return () => {
      newCanvas.dispose();
      canvasInstance.current = null;
    };
  }, []);

  // 브러시 색상 변경 적용
  useEffect(() => {
    if (canvasInstance.current) {
      canvasInstance.current.isDrawingMode = true;
      if (!canvasInstance.current.freeDrawingBrush) {
        canvasInstance.current.freeDrawingBrush = new fabric.PencilBrush(
          canvasInstance.current
        );
      }
      canvasInstance.current.freeDrawingBrush.color = brushColor;
    }
  }, [brushColor]);

  // 히스토리 저장 (캔버스 전체 상태 JSON 형태로 저장)
  const saveHistory = () => {
    console.log("저장");
    if (canvasInstance.current && !isLocked) {
      const json = canvasInstance.current.toJSON(); // 캔버스 JSON 저장
      setHistory((prev) => [...prev, json]); // 새로운 상태를 히스토리에 저장
      setRedoStack([]); // 새로운 변경이 생기면 Redo Stack 초기화
    }
    setIsLocked(false);
  };

  // 실행 취소 (Undo)
  const undo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      const lastState = newHistory.pop(); // 마지막 상태 제거

      if (lastState) {
        setRedoStack((prev) => [...prev, lastState]); // Redo를 위해 현재 상태 저장
      }

      setHistory(newHistory);
    }
  };

  // 다시 실행 (Redo)
  const redo = () => {
    if (redoStack.length > 0) {
      setIsLocked(true); // Redo 실행 중에는 saveHistory 방지

      const newRedoStack = [...redoStack];
      const redoState = newRedoStack.pop(); // Redo할 상태 가져오기

      if (redoState) {
        setHistory((prev) => [...prev, redoState]); // history 업데이트
      }

      setRedoStack(newRedoStack);
    }
  };

  useEffect(() => {
    console.log("최신 히스토리:", history);
    console.log("최신 redo:", redoStack);
  }, [history, redoStack]);

  return (
    <div>
      <canvas width="300" height="300" ref={canvasEl} className="border" />
      <div>
        <button onClick={undo} className="p-2 bg-gray-200 rounded">
          Undo
        </button>
        <button onClick={redo} className="p-2 bg-gray-200 rounded">
          Redo
        </button>
      </div>
    </div>
  );
}
