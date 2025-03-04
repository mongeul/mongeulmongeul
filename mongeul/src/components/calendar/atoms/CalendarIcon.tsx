"use client";
import FeedIcon from "@/assets/icons/feed.svg";
import Image from "next/image";

interface CalendarIconProps {
  hasDiary?: boolean;
  diaryImage?: string;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  hasDiary = false,
  diaryImage,
}) => {
  if (hasDiary) {
    return (
      // <Image src={diaryImage} alt="Diary" className="w-6 h-6 rounded-md" />
      <FeedIcon className="w-6 h-6 text-blue-300" />
    );
  }
  return <FeedIcon className="w-6 h-6 text-gray-300" />;
};

export default CalendarIcon;
