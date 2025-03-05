import FeelingsIcon from "@/components/common/atoms/FeelingsIcon";
import { Feeling } from "@/types/diaryTypes";

interface FeedFeelingIconProps {
  feeling: Feeling;
}

export default function FeedFeelingIcon({ feeling }: FeedFeelingIconProps) {
  const { icon } = FeelingsIcon({ feeling, size: "h-10 w-10" });

  return icon;
}
