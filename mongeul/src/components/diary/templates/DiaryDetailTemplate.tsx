"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedDiary } from "@/store/calendarSlice";
import { fetchMyDiary } from "@/lib/api/diary";
import Diary from "@/components/diary/organisms/Diary";
import DiaryDetail from "../organisms/DiaryDetail";
import LockDiary from "../organisms/LockDiary";
import useIsMobile from "@/utils/useIsMobile";

export default function DiaryDetailTemplate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedDiary = useSelector(
    (state: RootState) => state.calendar.selectedDiary
  );

  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!id) return;

    const fetchDiary = async () => {
      setLoading(true);
      try {
        const diary = await fetchMyDiary(Number(id));
        if (!diary) {
          dispatch(setSelectedDiary("LOCK"));
        } else {
          dispatch(setSelectedDiary(diary));
        }
      } catch (err) {
        console.error("Diary Fetch Error:", err);
        dispatch(setSelectedDiary("LOCK"));
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [id, dispatch]);

  const handlePasswordSubmit = async () => {
    if (password.length !== 4) {
      setError("비밀번호는 4자리여야 합니다.");
      return;
    }

    try {
      setError(null);
      const diary = await fetchMyDiary(Number(id), password);
      dispatch(setSelectedDiary(diary));
    } catch {
      setError("비밀번호가 틀렸습니다.");
      setPassword("");
    }
  };

  // LOCK 일때
  if (selectedDiary === "LOCK") {
    return (
      <LockDiary
        onPasswordChange={setPassword}
        onPasswordSubmit={handlePasswordSubmit}
        error={error}
      />
    );
  }

  // 모바일이면 DiaryDetail / 웹이면 Diary
  return isMobile ? (
    <div className="w-full flex flex-col items-center">
      <DiaryDetail />
    </div>
  ) : (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="flex-1">
        <Diary />
      </div>
    </div>
  );
}
