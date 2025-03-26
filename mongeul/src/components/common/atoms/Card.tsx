import clsx from "clsx";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  borderColor?: string;
  width?: string;
  height?: string;
  padding?: string;
  roundSize?: string;
  className?: string;
  bgColor?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  width = "w-auto",
  height = "h-auto",
  padding = "px-4 py-3",
  borderColor = "border-white",
  roundSize = "rounded-3xl",
  className,
  bgColor = "flex bg-white",
  onClick,
}: CardProps) {
  return (
    <div
      className={clsx(
        `${height}`,
        `${width}`,
        `${padding}`,
        `border ${borderColor}`,
        `${roundSize}`,
        bgColor,
        `${className}`,
        { "cursor-pointer": !!onClick }
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
