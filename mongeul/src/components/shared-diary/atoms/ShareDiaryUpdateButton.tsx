"use client";

import DiaryUpdateIcon from "@/assets/icons/diary-update.svg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setTitle,
  setContent,
  setDate,
  setFeeling,
  setPicture,
  setWeather,
} from "@/store/diarySlice";
import { SharedDiary } from "@/lib/api/shared-diary";
import { Feeling, Weather } from "@/types/diaryTypes";

export default function ShareDiaryUpdateButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedSharedDiary = useSelector(
    (state: RootState) => state.calendar.selectedSharedDiary
  ) as SharedDiary;

  const groupId = useSelector(
    (state: RootState) => state.calendar.selectedFriendId
  );

  const handleUpdate = () => {
    dispatch(setTitle(selectedSharedDiary.title));
    dispatch(setContent(selectedSharedDiary.content));
    dispatch(setDate(selectedSharedDiary.date));
    dispatch(setFeeling(selectedSharedDiary.feeling as Feeling));
    dispatch(setPicture(selectedSharedDiary.picture || null));
    dispatch(setWeather(selectedSharedDiary.weather as Weather));

    router.push(`/write-diary?groupId=${groupId}`);
  };

  return (
    <DiaryUpdateIcon onClick={handleUpdate} className="w-6 h-6 text-gray-400" />
  );
}
