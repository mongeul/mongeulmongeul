"use client";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  onClick: () => void;
}

export default function Button({
  text,
  width = "w-auto",
  height = "h-auto",
  backgroundColor = "bg-theme-400",
  borderColor = "border-0",
  textColor = "black",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        `${height}`,
        `${width}`,
        `${backgroundColor}`,
        `${borderColor}`,
        `${textColor}`,
        "rounded-full px-4 py-3 flex items-center justify-center"
      )}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
