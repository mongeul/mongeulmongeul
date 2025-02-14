"use client";

import Button from "@/components/button";
import DefaultLayout from "@/components/DefaultLayout";

export default function Page() {
  const submitDiary = (): void => {
    console.log("작성 버튼 클릭");
  };

  return (
    <DefaultLayout>
      <div className="w-full">
        일기 작성
        <Button text="작성하기" onClick={submitDiary} />
      </div>
    </DefaultLayout>
  );
}
