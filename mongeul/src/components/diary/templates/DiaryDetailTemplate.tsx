"use client";
import { useParams } from "next/navigation";
import Diary from "@/components/diary/organisms/Diary";
import DiaryDetail from "../organisms/DiaryDetail";
import LockDiary from "@/components/diary/organisms/LockDiary";
import { fetchMyDiary } from "@/lib/api/diary";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSelectedDiary } from "@/store/calendarSlice";

export default function DiaryDetailTemplate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedDiary = useSelector(
    (state: RootState) => state.calendar.selectedDiary
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");

  // ✅ 모바일 감지 상태
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // ✅ 초기 화면 크기 설정
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px 이하이면 모바일
    };

    checkScreenSize(); // 초기 실행

    // ✅ 창 크기 변경 이벤트 리스너 추가
    window.addEventListener("resize", checkScreenSize);

    return () => {
      // ✅ 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);
  useEffect(() => {
    if (!id) return;

    const fetchDiary = async () => {
      setLoading(true);
      try {
        console.log("📌 Fetching Diary ID:", id);
        const diary = await fetchMyDiary(Number(id));

        if (!diary) {
          console.log("🚨 일기 조회 실패 (잠김 가능성 있음)");
          dispatch(setSelectedDiary("LOCK"));
        } else {
          dispatch(setSelectedDiary(diary));
        }
      } catch (err) {
        console.error("🚨 Diary Fetch Error:", err);
        setError("일기를 불러오는 중 오류가 발생했습니다.");
        dispatch(setSelectedDiary("LOCK"));
      } finally {
        setLoading(false);
      }
    };

    fetchDiary();
  }, [id, dispatch]);

  const handlePasswordSubmit = async (password: string) => {
    setLoading(true);
    try {
      const diary = await fetchMyDiary(Number(id), password);
      dispatch(setSelectedDiary(diary));
    } catch (err) {
      console.error("🚨 비밀번호 입력 오류:", err); // ✅ 콘솔 로그 추가
      setError("비밀번호가 틀렸습니다.");
      window.alert("비밀번호가 틀렸습니다."); // ✅ alert 확인
      setPassword(""); // ✅ 비밀번호 초기화
    } finally {
      setLoading(false);
    }
  };

  return isMobile ? (
    <DiaryDetail />
  ) : (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <div className="flex-1">
        {selectedDiary === "LOCK" ? (
          <LockDiary onPasswordSubmit={handlePasswordSubmit} />
        ) : (
          <Diary />
        )}
      </div>
    </div>
  );
}
