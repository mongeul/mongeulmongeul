"use client";

export default function WriteButton() {
  const writeDiary = () => {
    [console.log("다이어리 작성 버튼 클릭")];
  };

  return <button onClick={writeDiary}>글작성</button>;
}
