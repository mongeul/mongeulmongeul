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

export default function DiaryDetailTemplate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedDiary = useSelector(
    (state: RootState) => state.calendar.selectedDiary
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [pwError, setPwError] = useState<string | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
      setPwError("비밀번호는 4자리여야 합니다.");
      return;
    }

    try {
      setPwError(null);
      const diary = await fetchMyDiary(Number(id), password);
      dispatch(setSelectedDiary(diary));
    } catch {
      setPwError("비밀번호가 틀렸습니다.");
      setPassword("");
    }
  };

  // 🔐 LOCK 상태일 때는 바로 LockDiary 렌더링
  if (selectedDiary === "LOCK") {
    return (
      <LockDiary
        password={password}
        onPasswordChange={setPassword}
        onPasswordSubmit={handlePasswordSubmit}
        error={pwError}
      />
    );
  }

  // ✅ 아닌 경우, 모바일이면 DiaryDetail / 웹이면 Diary
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
