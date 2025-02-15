"use client";

import { useState } from "react";
import Card from "../../card";

interface InputProps {
  placeholder: string;
}

export default function Input({ placeholder }: InputProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <div className="w-full">
      <Card borderColor={isTyping ? "border-theme-400" : undefined}>
        <input
          type="text"
          placeholder={placeholder}
          className="flex items-center justify-center w-full h-full text-center focus:outline-none"
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
        />
      </Card>
    </div>
  );
}
