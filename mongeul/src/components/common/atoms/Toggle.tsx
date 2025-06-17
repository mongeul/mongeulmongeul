"use client";
import clsx from "clsx";

interface ToggleProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export default function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={clsx(
        "w-12 h-6 rounded-full transition-colors duration-200 ease-in-out relative",
        enabled ? "bg-theme-200" : "bg-zinc-200"
      )}
    >
      <span
        className={clsx(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full transform transition-transform duration-200 ease-in-out",
          enabled ? "translate-x-6 bg-theme-400" : "translate-x-0 bg-white"
        )}
      />
    </button>
  );
}
