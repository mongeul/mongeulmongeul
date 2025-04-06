import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface DiaryFeelingIconProps {
  feeling: Feeling;
}

export default function DiaryFeelingIcon({ feeling }: DiaryFeelingIconProps) {
  const { icon } = FeelingsIcon({ feeling, size: "h-20 w-20" });

  return icon;
}
