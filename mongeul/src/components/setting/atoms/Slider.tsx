import { ReactEventHandler } from "react";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Slider({
  min,
  max,
  step,
  value,
  onChange,
}: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className="w-full appearance-none bg-transparent cursor-pointer relative z-10"
      style={{
        WebkitAppearance: "none",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    />
  );
}
