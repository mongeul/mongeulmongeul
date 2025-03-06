"use client";

import { RootState } from "@/store/store";
import Card from "@/components/common/atoms/Card";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { resetPicture } from "@/store/pictureSlice";
import { setPicture, setPictureLines } from "@/store/diarySlice";
import CloseIcon from "@/assets/icons/close.svg";
import PaletteIcon from "@/assets/icons/palette.svg";
import { fetchPictureLines } from "@/lib/api/write-diary";

export default function PictureCard({ diaryId }: { diaryId: number | null }) {
  const dispatch = useDispatch();

  const picture = useSelector((state: RootState) => state.diary.picture);

  const deletePicture = () => {
    dispatch(resetPicture());
    dispatch(setPicture(null));
    dispatch(setPictureLines([]));
  };

  const getPictureLines = async () => {
    if (diaryId) {
      try {
        const response = await fetchPictureLines(diaryId);
        dispatch(setPictureLines(response.data));
      } catch (error) {
        console.error("그림 데이터를 불러오는 중 오류 발생:", error);
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Card>
        {picture ? (
          <div className="w-full flex flex-col justify-center items-center">
            <button
              className="w-full flex flex-row justify-end items-center"
              onClick={deletePicture}
            >
              <CloseIcon className="text-gray-300 w-5 h-5" />
            </button>
            <Link href="/write-diary/picture">
              <div
                className="w-full flex justify-center items-center"
                onClick={getPictureLines}
              >
                <img src={picture} alt="저장된 그림" />
              </div>
            </Link>
          </div>
        ) : (
          <Link href="/write-diary/picture" className="w-full">
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
