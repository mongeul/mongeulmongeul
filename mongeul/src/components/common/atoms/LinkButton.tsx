"use client";
import clsx from "clsx";

interface LinkButtonProps {
  text: string;
  href: string;
  textColor?: string;
  fontWeight?: string;
  fontSize?: string;
  disabled?: boolean;
  onClick: () => void;
}

export default function LinkButton({
  text,
  href,
  textColor = "text-black",
  fontWeight = "font-normal",
  fontSize = "text-md",
  disabled = false,
  onClick,
}: LinkButtonProps) {
  return (
    <a
      href={disabled ? undefined : href}
      className={clsx(
        `${textColor}`,
        `${fontWeight}`,
        `${fontSize}`,
        "px-4 py-3 flex items-center justify-center gap-2",
        { "pointer-events-none opacity-50": disabled }
      )}
      onClick={disabled ? undefined : onClick}
    >
      {text}
    </a>
  );
}
