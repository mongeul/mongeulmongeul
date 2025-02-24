import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import RoundIcon from "../../common/atoms/RoundIcon";
import PublicIcon from "@/assets/icons/public.svg";
import UnlockedIcon from "@/assets/icons/unlocked.svg";
import LockedIcon from "@/assets/icons/locked.svg";

const DiaryDisclosure: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  if (!selectedDiary) return null;

  const { icon, label } = (() => {
    switch (selectedDiary.disclosure) {
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
  })();

  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};

export default DiaryDisclosure;
