import clsx from "clsx";
import { ReactElement } from "react";

interface CardProps {
  children: ReactElement;
  borderColor?: string;
  width?: string;
  height?: string;
  roundSize?: string;
}

export default function Card({
  children,
  width = "w-auto",
  height = "h-auto",
  borderColor = "border-white",
  roundSize = "rounded-3xl",
}: CardProps) {
  return (
    <div
      className={clsx(
        `${height}`,
        `${width}`,
        `border ${borderColor}`,
        `${roundSize}`,
        "px-4 py-3 flex bg-white"
      )}
    >
      {children}
    </div>
  );
}
