import { useState } from "react";
import Card from "./Card";
import clsx from "clsx";

interface InputProps {
  placeholder: string;
  value: string;
  borderColor?: string;
  className?: string;
  maxLength: number;
  roundSize?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  ref?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Input({
  placeholder,
  value,
  onChange,
  onKeyDown,
  borderColor = "border-white",
  className,
  roundSize = "rounded-3xl",
  maxLength,
}: InputProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <div className="w-full h-full">
      <Card
        borderColor={isTyping ? "border-theme-400" : borderColor}
        roundSize={roundSize}
      >
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className={clsx(
            `${className}`,
            "flex items-center justify-center w-full h-full text-center focus:outline-none resize-none"
          )}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          onChange={onChange}
          onKeyDown={onKeyDown}
          maxLength={maxLength}
        />
      </Card>
    </div>
  );
}
