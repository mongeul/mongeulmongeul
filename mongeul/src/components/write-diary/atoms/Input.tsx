import { useState } from "react";
import Card from "../../Card";

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, value, onChange }: InputProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <div className="w-full">
      <Card borderColor={isTyping ? "border-theme-400" : undefined}>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          className="flex items-center justify-center w-full h-full text-center focus:outline-none"
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          onChange={onChange}
        />
      </Card>
    </div>
  );
}
