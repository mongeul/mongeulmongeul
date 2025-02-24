import { Theme } from "@/types/settingTypes";
import RadioButton from "../atoms/RadioButton";
import ThemeButton from "../atoms/ThemeButton";

interface ThemeSelectProps {
  value: Theme;
  selected: boolean;
  onChange: () => void;
}

export default function ThemeSelect({
  value,
  selected,
  onChange,
}: ThemeSelectProps) {
  return (
    <div className="w-full flex flex-col items-center gap-4 cursor-pointer">
      <ThemeButton color={value} />
      <RadioButton value={value} selected={selected} onChange={onChange} />
    </div>
  );
}
