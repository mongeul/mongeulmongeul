"use client";

import Button from "@/components/common/atoms/Button";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function DefaultNavBar() {
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
      !diary.disclosure
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

  return (
    <>
      <Button
        text="작성하기"
        width="w-full"
        textColor="text-white"
        fontWeight="font-bold"
        onClick={submitDiary}
      />
    </>
  );
}
