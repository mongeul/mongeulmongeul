"use client";

import clsx from "clsx";
import CheckIcon from "@/assets/icons/check.svg";

interface CheckBoxProps {
  isChecked: boolean;
  handleToggle: () => void;
  label: string;
  textSize?: string;
  textColor?: string;
}

export default function CheckBox({
  label,
  isChecked,
  handleToggle,
  textSize = "text-sm",
  textColor = "text-black",
}: CheckBoxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      {/* 실제 체크박스 */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="hidden"
      />

      {/* 커스텀 체크박스 */}
      <div
        className={clsx(
          "w-5 h-5 p-0.5 flex items-center justify-center rounded-md border-2 transition-all duration-300",
          isChecked
            ? "bg-theme-500 border-theme-500 text-white"
            : "bg-white border-gray-400"
        )}
      >
        {isChecked && <CheckIcon className="text-white" />}
      </div>

      <span className={clsx(`${textColor}`, `${textSize}`)}>{label}</span>
    </label>
  );
}
