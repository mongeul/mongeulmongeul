import clsx from "clsx";
import { ReactElement } from "react";

interface CardProps {
  children: ReactElement;
  borderColor?: string;
  width?: string;
  height?: string;
  margin?: string;
  roundSize?: string;
}

export default function Card({
  children,
  width = "w-auto",
  height = "h-auto",
  margin = "px-4 py-3",
  borderColor = "border-white",
  roundSize = "rounded-3xl",
}: CardProps) {
  return (
    <div
      className={clsx(
        `${height}`,
        `${width}`,
        `${margin}`,
        `border ${borderColor}`,
        `${roundSize}`,
        " flex bg-white"
      )}
    >
      {children}
    </div>
  );
}
