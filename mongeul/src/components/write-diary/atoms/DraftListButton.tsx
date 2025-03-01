"use client";

export default function DraftListButton() {
  const handleButton = () => {
    console.log("임시저장 목록 호출");
  };

  const draftCount = 1;

  return (
    <button className="w-auto whitespace-nowrap px-8" onClick={handleButton}>
      {draftCount}
    </button>
  );
}
