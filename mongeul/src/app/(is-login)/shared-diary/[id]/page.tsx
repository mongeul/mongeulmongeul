"use client";

import { useParams } from "next/navigation";
import Calendar from "@/components/calendar/organisms/Calendar";

export default function SharedDiaryDetailPage() {
  const params = useParams();
  const { id } = params;

  const handleSelectDate = (date: string) => {
    console.log("선택된 날짜:", date);
    //  공유된 친구 ID와 날짜로 일기 데이터를 요청할 코드
  };

  return (
    <div>
      <Calendar onSelectDate={handleSelectDate} />
    </div>
  );
}
