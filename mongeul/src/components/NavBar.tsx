"use client";

import Link from "next/link";

export default function Navbar() {
  const writeDiary = () => {
    console.log("글작성 버튼 클릭");
  };
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex space-x-4 bg-theme-100 p-3">
      <Link href="/feed">피드</Link>
      <Link href="/diary">나의 일기</Link>
      <button onClick={writeDiary}>글작성</button>
      <Link href="/shared-diary">공유 일기</Link>
      <Link href="/setting">설정</Link>
    </div>
  );
}
