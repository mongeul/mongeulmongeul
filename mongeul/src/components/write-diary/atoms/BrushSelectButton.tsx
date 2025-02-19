interface BrushSelectButtonProps {
  brush: string;
  selected: boolean;
  onClick: () => void;
}

export default function BrushSelectButton({
  brush,
  onClick,
  selected,
}: BrushSelectButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-full border-2 transition ${
        selected ? "border-black scale-110" : "border-gray-300"
      }`}
    />
  );
}
