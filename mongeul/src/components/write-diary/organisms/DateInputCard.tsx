"use client";

import { useEffect, useState } from "react";
import Card from "@/components/common/atoms/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WebModal from "../../common/atoms/WebModal";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/store/diarySlice";
import { formatDate } from "@/utils/formatDate";
import { fetchDiaryDates } from "@/lib/api/write-diary";

function ModalContent({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.diary.date);
  const parsedDate = new Date(selectedDate || new Date());
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(parsedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(parsedDate.getFullYear());

  // ✅ 월 변경 시 작성된 날짜 조회
  useEffect(() => {
    async function loadDiaryDates() {
      try {
        const response = await fetchDiaryDates(currentYear, currentMonth + 1);
        if (response.success) {
          const disabled = response.data.map((item) => new Date(item.date));
          setDisabledDates(disabled);
        }
      } catch (error) {
        console.error("일기 날짜 조회 실패:", error);
      }
    }
    loadDiaryDates();
  }, [currentMonth, currentYear]); // ✅ 달이 바뀔 때마다 실행

  // ✅ 현재 보고 있는 달의 날짜만 보이도록 설정
  const renderDayContents = (day: number, date: Date) => {
    return date.getMonth() === currentMonth ? (
      <span>{day}</span>
    ) : (
      <span className="hidden"></span>
    );
  };

  // ✅ 달 변경 감지해서 상태 업데이트
  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  };

  // 날짜 선택
  const handleChange = (date: Date | null) => {
    if (!date) return;
    const formattedDate = date.toISOString().split("T")[0];
    dispatch(setDate(formattedDate));
    closeModal();
  };

  return (
    <div className="flex items-center">
      <DatePicker
        inline
        selected={parsedDate}
        onChange={handleChange}
        onMonthChange={handleMonthChange} // ✅ 월 변경 감지
        maxDate={new Date()} // 미래 날짜 제한
        excludeDates={disabledDates} // 작성된 날짜 비활성화
        renderDayContents={renderDayContents} // ✅ 현재 달만 보이도록 설정
      />
    </div>
  );
}

export default function DateInputCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedDate =
    useSelector((state: RootState) => state.diary.date) ??
    new Date().toISOString().split("T")[0];

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div className="w-full" onClick={toggleModal}>
        <Card width="w-full">
          <div className="flex justify-center items-center w-full">
            {formatDate(selectedDate)}
          </div>
        </Card>
      </div>

      {isModalOpen && (
        <WebModal onClose={toggleModal} padding="p-2">
          <ModalContent closeModal={toggleModal} />
        </WebModal>
      )}
    </>
  );
}
