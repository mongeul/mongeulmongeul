import PrivateStatusIcon from "@/components/common/atoms/PrivateStatusIcon";
import { PrivateStatus } from "@/types/diaryTypes";

interface PrivateStatusIconProps {
  privateStatus: PrivateStatus;
}

export default function FeedPrivateStatusIcon({
  privateStatus,
}: PrivateStatusIconProps) {
  const { icon } = PrivateStatusIcon({ privateStatus, size: "h-4 w-4" });

  return icon;
}
