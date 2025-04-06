import PrivateStatusIcon from "@/components/common/atoms/PrivateStatusIcon";
import { PrivateStatus } from "@/types/diaryTypes";

interface DiaryPrivateStatusIconProps {
  privateStatus: PrivateStatus;
}

export default function DiaryPrivateStatusIcon({
  privateStatus,
}: DiaryPrivateStatusIconProps) {
  return <PrivateStatusIcon privateStatus={privateStatus} size="h-10 w-10" />;
}
