import { useState } from "react";
import Card from "../../Card";
import clsx from "clsx";

interface TextareaProps {
  placeholder: string;
  height?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  placeholder,
  height = "h-72",
  value,
  onChange,
}: TextareaProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <div className={clsx(`${height}`, "w-full")}>
      <Card
        borderColor={isTyping ? "border-theme-400" : undefined}
        height={height}
      >
        <textarea
          placeholder={placeholder}
          value={value}
          className="flex items-center justify-center w-full h-full text-center focus:outline-none resize-none"
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          onChange={onChange}
        />
      </Card>
    </div>
  );
}
