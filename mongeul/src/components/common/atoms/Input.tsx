import { useState } from "react";
import Card from "./Card";
import clsx from "clsx";

interface InputProps {
  placeholder: string;
  value: string;
  borderColor?: string;
  height?: string;
  className?: string;
  maxLength: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  placeholder,
  value,
  onChange,
  borderColor = "border-white",
  height = "h-full",
  maxLength,
}: InputProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <div className="w-full">
      <Card borderColor={isTyping ? "border-theme-400" : borderColor}>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className={clsx(
            `${height}`,
            "flex items-center justify-center w-full text-center focus:outline-none resize-none"
          )}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          onChange={onChange}
          maxLength={maxLength}
        />
      </Card>
    </div>
  );
}
