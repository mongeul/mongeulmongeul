"use client";

import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/types/settingTypes";
import ThemeSelect from "./ThemeSelect";

export default function ThemeSelectList() {
  const { theme, setTheme } = useTheme();

  const themes: Theme[] = ["sky", "amber", "lime", "pink", "stone"];

  return (
    <div className="w-full px-4 flex flex-row justify-evenly items-center gap-6">
      {themes.map((t) => (
        <ThemeSelect
          key={t}
          value={t}
          selected={t === theme}
          onChange={() => setTheme(t)}
        />
      ))}
    </div>
  );
}
