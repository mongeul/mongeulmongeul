"use client";

import { useTheme } from "@/context/ThemeContext";
import RadioButton from "../atoms/RadioButton";
import { FontOption } from "@/types/settingTypes";

export default function FontSelect() {
  const { font, setFont } = useTheme();

  const fonts: FontOption[] = [
    { label: "SUIT", value: "suit" },
    { label: "고운 돋움", value: "gowun-dodum" },
  ];

  return (
    <div className="w-full px-4 flex flex-col justify-center items-center gap-6">
      {fonts.map((f) => (
        <RadioButton
          key={f.value}
          label={f.label}
          value={f.value}
          selected={font === f.value}
          onClick={() => setFont(f.value)}
        />
      ))}
    </div>
  );
}
