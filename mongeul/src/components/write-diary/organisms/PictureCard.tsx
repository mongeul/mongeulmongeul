"use client";

import { RootState } from "@/store/store";
import Card from "@/components/common/atoms/Card";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { resetPicture, updateLines } from "@/store/pictureSlice";
import { setPicture, setPictureLines } from "@/store/diarySlice";
import CloseIcon from "@/assets/icons/close.svg";
import PaletteIcon from "@/assets/icons/palette.svg";
import { fetchPictureLines } from "@/lib/api/write-diary";
import Image from "next/image";

export default function PictureCard({ diaryId }: { diaryId: number | null }) {
  const dispatch = useDispatch();

  const picture = useSelector((state: RootState) => state.diary.picture);

  const deletePicture = () => {
    dispatch(resetPicture());
    dispatch(setPicture(null));
    dispatch(setPictureLines([]));
  };

  const handlePictureLines = async (diaryId: number | null) => {
    console.log("일기 라인 불러오기");
    if (!diaryId || !picture) return;

    try {
      const pictureLinesResponse = await fetchPictureLines(diaryId);
      console.log(pictureLinesResponse);

      if (pictureLinesResponse.data.pictureLines) {
        dispatch(setPictureLines(pictureLinesResponse.data.pictureLines));
        dispatch(updateLines(pictureLinesResponse.data.pictureLines));
      }
    } catch (error) {
      console.error("일기 라인 불러오기 실패:", error);
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
                onClick={() => handlePictureLines(diaryId)}
              >
                <Image
                  src={picture}
                  alt="저장된 그림"
                  width={500}
                  height={500}
                  layout="intrinsic"
                />
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
