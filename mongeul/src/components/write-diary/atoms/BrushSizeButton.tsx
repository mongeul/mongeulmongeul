interface BrushSizeButtonProps {
  size: number;
  selected: boolean;
  onClick: () => void;
}

export default function BrushSizeButton({
  size,
  selected,
  onClick,
}: BrushSizeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center transition"
      style={{
        width: `${size * 2}px`,
        height: `${size * 2}px`,
      }}
    >
      {selected && (
        <span
          className="absolute border-4 border-blue-500 rounded-full animate-pulse"
          style={{
            width: `${size * 2 + 8}px`,
            height: `${size * 2 + 8}px`,
          }}
        />
      )}
      <div
        className="rounded-full bg-black"
        style={{
          width: `${size * 2}px`,
          height: `${size * 2}px`,
        }}
      />
    </button>
  );
}
