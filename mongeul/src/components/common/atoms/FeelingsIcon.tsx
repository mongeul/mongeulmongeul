import Image from "next/image";
import Happy from "@/assets/images/happy.png";
import Sad from "@/assets/images/sad.png";
import Soso from "@/assets/images/soso.png";
import Angry from "@/assets/images/angry.png";
import Wow from "@/assets/images/wow.png";
import Basic from "@/assets/images/basic.png";
import { Feeling } from "@/types/diaryTypes";
import { useMemo } from "react";

interface FeelingsIconProps {
  feeling: Feeling;
  size?: string;
}

export default function FeelingsIcon({
  feeling,
  size = "w-24 h-24",
}: FeelingsIconProps) {
  const status = useMemo(() => {
    switch (feeling) {
      case "HAPPY":
        return {
          icon: <Image src={Happy} alt="행복해요" className={size} />,
          label: "행복해요",
        };
      case "SAD":
        return {
          icon: <Image src={Sad} alt="슬퍼요" className={size} />,
          label: "슬퍼요",
        };
      case "ANGRY":
        return {
          icon: <Image src={Angry} alt="화나요" className={size} />,
          label: "화나요",
        };
      case "WOW":
        return {
          icon: <Image src={Wow} alt="놀라워요" className={size} />,
          label: "놀라워요",
        };
      case "SOSO":
        return {
          icon: <Image src={Soso} alt="그저그래요" className={size} />,
          label: "그저그래요",
        };
      default:
        return {
          icon: <Image src={Basic} alt="기분 없음" className={size} />,
          label: "기분 없음",
        };
    }
  }, [feeling, size]);

  return status;
}
