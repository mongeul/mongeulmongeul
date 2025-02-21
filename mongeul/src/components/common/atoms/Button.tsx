"use client";
import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  fontWeight?: string;
  roundSize?: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button({
  text,
  icon,
  width = "w-auto",
  height = "h-auto",
  backgroundColor = "bg-theme-400",
  borderColor = "border-0",
  textColor = "text-black",
  fontWeight = "font-normal",
  roundSize = "rounded-3xl",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `${height}`,
        `${width}`,
        `${backgroundColor}`,
        `${borderColor}`,
        `${textColor}`,
        `${roundSize}`,
        `${fontWeight}`,
        "px-4 py-3 flex items-center justify-center gap-2"
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
}
