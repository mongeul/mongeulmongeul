import RoundIcon from "@/components/common/atoms/RoundIcon";
import PublicIcon from "@/assets/icons/public.svg";
import UnlockedIcon from "@/assets/icons/unlocked.svg";
import LockedIcon from "@/assets/icons/locked.svg";
import { PrivateStatus } from "@/types/diaryTypes";

export function getPrivateStatusIcon(privateStatus: PrivateStatus) {
  switch (privateStatus) {
    case "PUBLIC":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-600">
            <PublicIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "전체 공개",
      };

    case "PRIVATE":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-theme-500">
            <UnlockedIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "나만 보기",
      };

    case "LOCK":
      return {
        icon: (
          <RoundIcon backgroundColor="bg-zinc-300">
            <LockedIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "잠금 일기",
      };

    default:
      return {
        icon: (
          <RoundIcon backgroundColor="bg-zinc-300">
            <PublicIcon className="text-white h-9 w-9" />
          </RoundIcon>
        ),
        label: "전체 공개",
      };
  }
}
