"use client";

import DefaultLayout from "@/components/layout/DefaultLayout";
import IconCard from "@/components/write-diary/organisms/IconCard";
import DateInputCard from "@/components/write-diary/organisms/DateInputCard";
import ContentCard from "@/components/write-diary/organisms/ContentCard";
import TitleCard from "@/components/write-diary/organisms/TitleCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { resetDiary } from "@/store/diarySlice";
import { createDiary } from "@/lib/api/diary";
import Button from "@/components/common/atoms/Button";

export default function Page() {
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

    // const result = await createDiary(diary);
    // if (result.success) {
    //   console.log("일기 작성 성공:", result);
    //   dispatch(resetDiary());
    // } else {
    //   console.error("일기 작성 실패:", result.message);
    // }
  };

  return (
    <DefaultLayout>
      <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
        <DateInputCard />
        <IconCard />
        <TitleCard />
        <ContentCard />
        <Button
          text="작성하기"
          width="w-full"
          textColor="text-white"
          fontWeight="font-bold"
          onClick={submitDiary}
        />
      </div>
    </DefaultLayout>
  );
}
