"use client";

import { useState } from "react";
import RadioButton from "../atoms/RadioButton";

interface FontSelectProps {
  selectedFont: string;
  onFontChange: (value: string) => void;
}

export default function FontSelect({
  selectedFont,
  onFontChange,
}: FontSelectProps) {
  const fonts = [
    { label: "SUIT", value: "suit" },
    { label: "고운 돋움", value: "gowun-dodum" },
  ];

  return (
    <div className="w-full px-4 flex flex-col justify-center items-center gap-6">
      {fonts.map((font) => (
        <RadioButton
          key={font.value}
          label={font.label}
          value={font.value}
          selected={selectedFont === font.value}
          onClick={() => onFontChange(font.value)}
        />
      ))}
    </div>
  );
}
