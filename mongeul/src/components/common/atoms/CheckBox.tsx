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
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span
        onClick={handleToggle}
        className={clsx(`${textColor}`, `${textSize}`)}
      >
        {label}
      </span>
    </label>
  );
}
