import DiaryUpdateIcon from "@/assets/icons/diary-update.svg";
import {
  setTitle,
  setContent,
  setDate,
  setFeeling,
  setPrivateStatus,
  setWeather,
  setPicture,
} from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { Diary } from "@/types/diaryTypes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function DiaryUpdateButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedDiary = useSelector(
    (state: RootState) => state.calendar.selectedDiary
  ) as Diary;

  const handleDiaryUpdate = () => {
    dispatch(setTitle(selectedDiary.title));
    dispatch(setContent(selectedDiary.content));
    dispatch(setDate(selectedDiary.date));
    dispatch(setFeeling(selectedDiary.feeling));
    dispatch(setPrivateStatus(selectedDiary.privateStatus));
    dispatch(setPicture(selectedDiary.picture ? selectedDiary.picture : null));
    dispatch(setWeather(selectedDiary.weather));

    router.push(`/write-diary?id=${selectedDiary.diaryId}`);
  };

  return (
    <DiaryUpdateIcon
      onClick={handleDiaryUpdate}
      className="w-6 h-6 text-gray-400"
    />
  );
}
