"use client";
import { useParams } from "next/navigation";
import Diary from "@/components/diary/organisms/Diary";
import LockDiary from "@/components/diary/organisms/LockDiary";
import { fetchMyDiary } from "@/lib/api/diary";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedDiary } from "@/store/calendarSlice";

export default function DiaryDetailTemplate() {
  const { id } = useParams(); // ✅ 현재 페이지의 ID 가져오기
  const dispatch = useDispatch();
  const selectedDiary = useSelector(
    (state: RootState) => state.calendar.selectedDiary
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (!id) return; // ✅ ID가 없으면 실행하지 않음

    const fetchDiary = async () => {
      setLoading(true);
      try {
        console.log("📌 Fetching Diary ID:", id); // ✅ 로그 추가
        const diary = await fetchMyDiary(Number(id)); // ✅ API 호출
        dispatch(setSelectedDiary(diary));
      } catch (err) {
        console.error("🚨 Diary Fetch Error:", err);
        setError("일기를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [id, dispatch]);

  // ✅ 비밀번호 입력 후 API 호출
  const handlePasswordSubmit = async (password: string) => {
    setLoading(true);
    try {
      const diary = await fetchMyDiary(Number(id), password);
      dispatch(setSelectedDiary(diary));
    } catch (err) {
      console.error("🚨 비밀번호 입력 오류:", err);
      setError("비밀번호가 틀렸습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>📌 로딩 중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!selectedDiary) return <p>❌ 일기를 찾을 수 없습니다.</p>;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="flex-1">
        {selectedDiary.privateStatus === "LOCK" ? (
          <LockDiary onPasswordSubmit={handlePasswordSubmit} />
        ) : (
          <Diary />
        )}
      </div>
    </div>
  );
}
