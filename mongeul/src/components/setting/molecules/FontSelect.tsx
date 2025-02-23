import { Font } from "@/types/settingTypes";
import RadioButton from "../atoms/RadioButton";

interface FontSelectProps {
  label: string;
  value: Font;
  selected: boolean;
  onChange: () => void;
}

export default function FontSelect({
  label,
  value,
  selected,
  onChange,
}: FontSelectProps) {
  return (
    <label
      className="w-full flex items-center gap-2 cursor-pointer"
      data-font={value}
    >
      <RadioButton value={value} selected={selected} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
