import clsx from "clsx";
import { ReactElement } from "react";

interface RoundIconProps {
  children: ReactElement;
  backgroundColor: string;
}

export default function RoundIcon({
  children,
  backgroundColor,
}: RoundIconProps) {
  return (
    <div
      className={clsx(
        `${backgroundColor}`,
        "flex items-center justify-center bg-theme-300 w-fit rounded-full p-2"
      )}
    >
      {children}
    </div>
  );
}
