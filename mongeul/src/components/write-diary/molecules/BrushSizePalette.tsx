import BrushSizeButton from "../atoms/BrushSizeButton";

const sizes = [1, 5, 15, 30, 50];

interface BrushSizePaletteProps {
  brushSize: number;
  onSelectSize: (size: number) => void;
}

export default function BrushSizePalette({
  brushSize,
  onSelectSize,
}: BrushSizePaletteProps) {
  return (
    <div className="flex flex-wrap w-full justify-center gap-3">
      {sizes.map((size) => (
        <BrushSizeButton
          key={size}
          size={size}
          selected={brushSize === size}
          onClick={() => onSelectSize(size)}
        />
      ))}
    </div>
  );
}
