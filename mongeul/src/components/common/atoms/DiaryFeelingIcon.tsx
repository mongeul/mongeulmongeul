import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface DiaryFeelingIconProps {
  feeling: Feeling;
}

export default function DiaryFeelingIcon({ feeling }: DiaryFeelingIconProps) {
  return <FeelingsIcon feeling={feeling} size="h-20 w-20" />;
}
