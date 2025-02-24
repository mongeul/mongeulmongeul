"use client";

import { RootState } from "@/store/store";
import Card from "@/components/common/atoms/Card";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { resetDrawing } from "@/store/drawingSlice";
import { setDrawing, setDrawingImage } from "@/store/diarySlice";
import CloseIcon from "@/assets/icons/close.svg";
import PaletteIcon from "@/assets/icons/palette.svg";

export default function DrawingCard() {
  const dispatch = useDispatch();

  const drawingImage = useSelector(
    (state: RootState) => state.diary.drawingImage
  );

  const deleteDrawing = () => {
    dispatch(resetDrawing());
    dispatch(setDrawing(null));
    dispatch(setDrawingImage(null));
  };

  return (
    <div className="w-full h-full">
      <Card>
        {drawingImage ? (
          <div className="w-full flex flex-col justify-center items-center">
            <button
              className="w-full flex flex-row justify-end items-center"
              onClick={deleteDrawing}
            >
              <CloseIcon className="text-gray-300 w-5 h-5" />
            </button>
            <Link href="/write-diary/drawing">
              <div className="w-full flex justify-center items-center">
                <img src={drawingImage} alt="저장된 그림" />
              </div>
            </Link>
          </div>
        ) : (
          <Link href="/write-diary/drawing" className="w-full">
            <div className="w-full h-full flex flex-col justify-center items-center text-zinc-400 gap-4">
              <div>오늘 하루를 그림으로 남겨보세요</div>
              <div className="p-4">
                <PaletteIcon className="text-zinc-300 w-14 h-14" />
              </div>
            </div>
          </Link>
        )}
      </Card>
    </div>
  );
}
