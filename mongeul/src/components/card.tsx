import clsx from "clsx";
import { ReactElement } from "react";

interface CardProps {
  children: ReactElement;
  borderColor?: string;
  width?: string;
  height?: string;
}

export default function Card({
  children,
  width = "w-auto",
  height = "h-auto",
  borderColor = "border-white",
}: CardProps) {
  return (
    <div
      className={clsx(
        `${height}`,
        `${width}`,
        `border ${borderColor}`,
        "rounded-full px-4 py-3 flex bg-white"
      )}
    >
      {children}
    </div>
  );
}
