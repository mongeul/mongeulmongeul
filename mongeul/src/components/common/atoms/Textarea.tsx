import { useState } from "react";
import Card from "./Card";
import clsx from "clsx";

interface TextareaProps {
  placeholder: string;
  className?: string;
  value: string;
  maxLength: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  placeholder,
  className = "h-72",
  value,
  maxLength,
  onChange,
}: TextareaProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <div className="w-full">
      <Card
        borderColor={isTyping ? "border-theme-400" : undefined}
        height={className}
      >
        <div className="flex flex-col items-center justify-center w-full h-full">
          <textarea
            placeholder={placeholder}
            value={value}
            className="w-full h-full text-center focus:outline-none resize-none"
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
            onChange={onChange}
            maxLength={maxLength}
          />
          <div className="flex w-full justify-end text-xs text-zinc-300">
            {value.length}/{maxLength}
          </div>
        </div>
      </Card>
    </div>
  );
}
