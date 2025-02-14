import { useState } from "react";
import Card from "../card";
import clsx from "clsx";

interface TextareaCardProps {
  placeholder: string;
  height?: string;
}

export default function TextareaCard({
  placeholder,
  height = "h-72",
}: TextareaCardProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <div className={clsx(`${height}`, "w-1/3")}>
      <Card
        borderColor={isTyping ? "border-theme-400" : undefined}
        height={height}
      >
        <textarea
          placeholder={placeholder}
          className="flex items-center justify-center w-full h-full text-center focus:outline-none resize-none"
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
        />
      </Card>
    </div>
  );
}
