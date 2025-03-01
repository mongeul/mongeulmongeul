"use client";
import clsx from "clsx";

interface LinkButtonProps {
  text: string;
  textColor?: string;
  fontWeight?: string;
  fontSize?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function LinkButton({
  text,
  textColor = "text-gray-500",
  fontWeight = "font-normal",
  fontSize = "text-xs",
  disabled = false,
  onClick,
}: LinkButtonProps) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={clsx(
        `${textColor}`,
        `${fontWeight}`,
        `${fontSize}`,
        "flex items-center justify-center underline"
      )}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
