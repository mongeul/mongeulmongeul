import { Theme } from "@/types/settingTypes";
import clsx from "clsx";

interface ThemeButtonProps {
  color: Theme;
}

export default function ThemeButton({ color }: ThemeButtonProps) {
  return (
    <button className="w-8 h-8 relative flex items-center justify-center transition">
      <div
        className={clsx(
          `bg-${color}-200`,
          "w-full h-full border-zinc-100 border-2 rounded-full"
        )}
      />
    </button>
  );
}
