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
      className={`w-8 h-8 rounded-full border-2 transition ${
        selected ? "border-black scale-110" : "border-gray-300"
      }`}
      style={{ backgroundColor: color }}
    />
  );
}
