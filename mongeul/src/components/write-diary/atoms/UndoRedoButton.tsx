import { ReactNode } from "react";

interface UndoRedoButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}

export default function UndoRedoButton({
  onClick,
  disabled,
  children,
}: UndoRedoButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`p-2 rounded`}>
      <div
        className={`w-full h-full flex items-center justify-center ${
          disabled ? "text-gray-300" : "text-theme-300 hover:text-theme-400"
        }`}
      >
        {children}
      </div>
    </button>
  );
}
