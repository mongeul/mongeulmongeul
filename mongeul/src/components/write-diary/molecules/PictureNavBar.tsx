"use client";

import Button from "@/components/common/atoms/Button";
import { setPicture, setPictureLines } from "@/store/diarySlice";
import { resetPicture } from "@/store/pictureSlice";
import { RootState } from "@/store/store";
import { stageRef } from "@/utils/stateRef";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function PictureNavBar() {
  const dispatch = useDispatch();
  const { lines } = useSelector((state: RootState) => state.picture);
  const router = useRouter();

  function savePicture() {
    if (lines.length === 0) {
      alert("저장할 그림이 없습니다!");
      return;
    }

    dispatch(setPictureLines(lines));

    console.log("JSON 저장 완료:", lines);

    // 전역 변수에서 가져온 stageRef를 활용하여 이미지 저장
    if (stageRef) {
      const pictureImage = stageRef.toDataURL();
      dispatch(setPicture(pictureImage));
      console.log("이미지 저장 완료:", pictureImage);
    } else {
      console.error("stageRef가 null입니다. 확인해주세요.");
    }

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
