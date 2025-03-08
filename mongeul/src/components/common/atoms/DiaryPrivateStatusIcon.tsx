import PrivateStatusIcon from "@/components/common/atoms/PrivateStatusIcon";
import { PrivateStatus } from "@/types/diaryTypes";

interface DiaryPrivateStatusIconProps {
  privateStatus: PrivateStatus;
}

export default function DiaryPrivateStatusIcon({
  privateStatus,
}: DiaryPrivateStatusIconProps) {
  const { icon } = PrivateStatusIcon({ privateStatus, size: "h-4 w-4" });

  return icon;
}
