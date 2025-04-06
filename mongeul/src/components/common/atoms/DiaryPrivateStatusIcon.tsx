import PrivateStatusIcon from "@/components/common/atoms/PrivateStatusIcon";
import { PrivateStatus } from "@/types/diaryTypes";

interface DiaryPrivateStatusIconProps {
  privateStatus: PrivateStatus;
}

export default function DiaryPrivateStatusIcon({
  privateStatus,
}: DiaryPrivateStatusIconProps) {
  const { icon } = PrivateStatusIcon({ privateStatus, size: "h-10 w-10" });

  return icon;
}
