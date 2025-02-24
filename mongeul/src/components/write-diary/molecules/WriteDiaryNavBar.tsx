"use client";

import Button from "@/components/common/atoms/Button";
import { resetDiary } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function WriteDiaryNavBar() {
  const dispatch = useDispatch();
  const diary = useSelector((state: RootState) => state.diary);

  const submitDiary = async () => {
    console.log("일기 작성 버튼 클릭");

    if (
      !diary.title ||
      !diary.content ||
      !diary.date ||
      !diary.weather ||
      !diary.feelings ||
      !diary.privateStatus
    ) {
      alert("필수 입력값을 채워주세요");
      return;
    }
  };

  // const result = await createDiary(diary);
  // if (result.success) {
  //   console.log("일기 작성 성공:", result);
  //   dispatch(resetDiary());
  // } else {
  //   console.error("일기 작성 실패:", result.message);
  // }

  const clearDiary = () => {
    dispatch(resetDiary());
  };

  return (
    <div className="w-full px-6 flex flex-row gap-6">
      <Button
        text="작성하기"
        width="w-full"
        textColor="text-white"
        fontWeight="font-bold"
        onClick={submitDiary}
      />
      <Button
        text="새로 쓰기"
        width="w-full"
        borderColor="border border-theme-400"
        backgroundColor="bg-white"
        textColor="text-theme-400"
        fontWeight="font-bold"
        onClick={clearDiary}
      />
    </div>
  );
}
