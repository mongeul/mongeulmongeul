"use client";

import { useTheme } from "@/context/ThemeContext";
import { FontOption } from "@/types/settingTypes";
import FontSelect from "./FontSelect";

export default function FontSelectList() {
  const { font, setFont } = useTheme();

  const fonts: FontOption[] = [
    { label: "SUIT", value: "suit" },
    { label: "고운 돋움", value: "gowun-dodum" },
  ];

  return (
    <div className="w-full px-4 flex flex-col justify-center items-center gap-6">
      {fonts.map((f) => (
        <FontSelect
          key={f.value}
          label={f.label}
          value={f.value}
          selected={font === f.value}
          onChange={() => setFont(f.value)}
        />
      ))}
    </div>
  );
}
