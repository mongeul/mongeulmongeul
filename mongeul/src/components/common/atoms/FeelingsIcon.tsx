import Image from "next/image";
import Happy from "@/assets/images/happy.png";
import Sad from "@/assets/images/sad.png";
import Soso from "@/assets/images/soso.png";
import Angry from "@/assets/images/angry.png";
import Wow from "@/assets/images/wow.png";
import Basic from "@/assets/images/basic.png";
import { Feeling } from "@/types/diaryTypes";

interface FeelingsIconProps {
  feeling: Feeling;
  size?: string;
}

const feelingMap: Record<Feeling | string, { src: any; alt: string }> = {
  HAPPY: { src: Happy, alt: "행복해요" },
  SAD: { src: Sad, alt: "슬퍼요" },
  ANGRY: { src: Angry, alt: "화나요" },
  WOW: { src: Wow, alt: "놀라워요" },
  SOSO: { src: Soso, alt: "그저그래요" },
  DEFAULT: { src: Basic, alt: "기분 없음" },
};

export default function FeelingsIcon({
  feeling,
  size = "w-24 h-24",
}: FeelingsIconProps) {
  const { src, alt } = feelingMap[feeling] || feelingMap["DEFAULT"];

  return (
    <div className={`relative ${size}`}>
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}
