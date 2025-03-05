import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface DiaryFeelingIconProps {
  feeling: Feeling;
}

export default function DiaryFeelingIcon({ feeling }: DiaryFeelingIconProps) {
  const { icon } = FeelingsIcon({ feeling, size: "h-10 w-10" });

  return icon;
}
