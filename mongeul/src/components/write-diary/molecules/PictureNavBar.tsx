"use client";

import Button from "@/components/common/atoms/Button";
import { setPicture, setPictureLines } from "@/store/diarySlice";
import { resetPicture } from "@/store/pictureSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function PictureNavBar() {
  const dispatch = useDispatch();
  const { stageRef, lines } = useSelector((state: RootState) => state.picture);
  const router = useRouter();

  function savePicture() {
    if (lines.length === 0) {
      alert("저장할 그림이 없습니다!");
      return;
    }

    if (!stageRef) {
      alert("그림판이 아직 준비되지 않았어요!");
      return;
    }

    const pictureImage = stageRef.toDataURL();
    dispatch(setPictureLines(lines));
    dispatch(setPicture(pictureImage));
    console.log("이미지 저장 완료");

    router.back();
  }

  const clearPicture = () => {
    dispatch(resetPicture());
  };

  return (
    <div className="w-full px-6 flex flex-row gap-6">
      <Button
        text="저장하기"
        width="w-full"
        textColor="text-white"
        fontWeight="font-bold"
        onClick={savePicture}
      />
      <Button
        text="다시 그리기"
        width="w-full"
        borderColor="border border-theme-400"
        backgroundColor="bg-white"
        textColor="text-theme-400"
        fontWeight="font-bold"
        onClick={clearPicture}
      />
    </div>
  );
}
