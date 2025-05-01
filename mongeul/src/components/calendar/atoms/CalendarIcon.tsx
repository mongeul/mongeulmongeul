"use client";
import FeedIcon from "@/assets/icons/feed.svg";
import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface CalendarIconProps {
  hasDiary?: boolean;
  feeling?: Feeling;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  hasDiary = false,
  feeling,
}) => {
  if (hasDiary && feeling) {
    return <FeelingsIcon feeling={feeling} size="w-10 h-10" />;
  }
  return <FeedIcon className="w-6 h-6 text-gray-200 my-2" />;
};

export default CalendarIcon;
