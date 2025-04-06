import Image from "next/image";
import Public from "@/assets/images/public.png";
import Private from "@/assets/images/private.png";
import Lock from "@/assets/images/lock.png";
import { PrivateStatus } from "@/types/diaryTypes";
import { useMemo } from "react";

interface PrivateStatusIconProps {
  privateStatus: PrivateStatus;
  size?: string;
}

export default function PrivateStatusIcon({
  privateStatus,
  size = "w-20 h-20",
}: PrivateStatusIconProps) {
  const status = useMemo(() => {
    switch (privateStatus) {
      case "PUBLIC":
        return {
          icon: <Image src={Public} alt="전체공개" className={size} />,
          label: "전체 공개",
        };
      case "PRIVATE":
        return {
          icon: <Image src={Private} alt="나만 보기" className={size} />,
          label: "나만 보기",
        };
      case "LOCK":
        return {
          icon: <Image src={Lock} alt="잠금 일기" className={size} />,
          label: "잠금 일기",
        };
      default:
        return {
          icon: <Image src={Private} alt="나만 보기" className={size} />,
          label: "나만 보기",
        };
    }
  }, [privateStatus, size]);

  return status;
}
