"use client";
import WriteIcon from "@/assets/icons/write.svg";

export default function WriteButton() {
  const writeDiary = () => {
    [console.log("다이어리 작성 버튼 클릭")];
  };

  return (
    <button onClick={writeDiary}>
      <WriteIcon className="absolute -top-4 left-1/2 -translate-x-1/2 w-14 h-14 text-theme-400" />
    </button>
  );
}
