"use client";

import CheckBox from "@/components/common/atoms/CheckBox";
import { setMyFeed } from "@/store/feedSlice";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PrivateDiaryCheckbox() {
  const dispatch = useDispatch();
  const myFeed = useSelector((state: RootState) => state.feed.myFeed);
  const handleToggle = () => {
    dispatch(setMyFeed(!myFeed));
  };

  return (
    <CheckBox
      label="내 일기 보기"
      isChecked={myFeed}
      handleToggle={handleToggle}
    />
  );
}
