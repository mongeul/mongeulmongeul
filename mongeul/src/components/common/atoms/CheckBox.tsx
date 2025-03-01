"use client";

import clsx from "clsx";

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
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="hidden"
      />

      <div
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleToggle();
        }}
        onClick={handleToggle}
        className={clsx(
          "w-5 h-5 flex items-center justify-center rounded-md border-2 transition-all focus:ring-2",
          isChecked
            ? "bg-theme-500 border-theme-500 focus:ring-theme-300"
            : "bg-white border-gray-400 focus:ring-gray-300"
        )}
      >
        {isChecked && <div className="w-3 h-3 bg-white rounded-sm"></div>}
      </div>
      <span className={clsx(`${textColor}`, `${textSize}`)}>{label}</span>
    </label>
  );
}
