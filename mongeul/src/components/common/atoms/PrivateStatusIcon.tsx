import Image from "next/image";
import Public from "@/assets/images/public.png";
import Private from "@/assets/images/private.png";
import Lock from "@/assets/images/lock.png";
import { PrivateStatus } from "@/types/diaryTypes";

interface PrivateStatusIconProps {
  privateStatus: PrivateStatus;
  size?: string;
}

const privateStatusImageMap: Record<
  PrivateStatus | string,
  { src: any; alt: string }
> = {
  PUBLIC: { src: Public, alt: "전체 공개" },
  PRIVATE: { src: Private, alt: "나만 보기" },
  LOCK: { src: Lock, alt: "잠금 일기" },
  DEFAULT: { src: Private, alt: "나만 보기" },
};

export default function PrivateStatusIcon({
  privateStatus,
  size = "w-20 h-20",
}: PrivateStatusIconProps) {
  const { src, alt } =
    privateStatusImageMap[privateStatus] || privateStatusImageMap["DEFAULT"];

  return (
    <div className={`relative ${size}`}>
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}
