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
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {selected && (
        <span
          className="absolute border-4 border-theme-600 rounded-full"
          style={{
            width: `${size + 14}px`,
            height: `${size + 14}px`,
          }}
        />
      )}
      <div
        className="rounded-full bg-theme-200"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </button>
  );
}
