interface ColorButtonProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

export default function ColorButton({
  color,
  selected,
  onClick,
}: ColorButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 relative flex items-center justify-center transition"
    >
      {selected && (
        <span className="w-10 h-10 absolute border-4 border-theme-500 rounded-full" />
      )}
      <div
        className="w-full h-full border-zinc-100 border-2 rounded-full bg-theme-200"
        style={{ backgroundColor: color }}
      />
    </button>
  );
}
