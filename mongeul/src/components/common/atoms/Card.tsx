import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  borderColor?: string;
  width?: string;
  height?: string;
  padding?: string;
  roundSize?: string;
}

export default function Card({
  children,
  width = "w-auto",
  height = "h-auto",
  padding = "px-4 py-3",
  borderColor = "border-white",
  roundSize = "rounded-3xl",
}: CardProps) {
  return (
    <div
      className={clsx(
        `${height}`,
        `${width}`,
        `${padding}`,
        `border ${borderColor}`,
        `${roundSize}`,
        "flex bg-white"
      )}
    >
      {children}
    </div>
  );
}
