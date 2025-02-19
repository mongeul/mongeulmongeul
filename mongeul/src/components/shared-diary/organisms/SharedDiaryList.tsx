import SharedDiaryCard from "@/components/shared-diary/molecules/SharedDiaryCard";

// 임시 데이터
const diaries = [
  { name: "승탁이", writer: "승탁이", date: "오늘", duration: 98 },
  { name: "호주니", writer: "승미니", date: "어제", duration: 98 },
  { name: "joy", writer: "승미니", date: "4일 전", duration: 98 },
];

export default function DiaryList() {
  return (
    <div className="flex flex-col gap-4 px-4">
      {diaries.map((diary, index) => (
        <SharedDiaryCard key={index} {...diary} />
      ))}
    </div>
  );
}
