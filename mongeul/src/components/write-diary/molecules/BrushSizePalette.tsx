import BrushSizeButton from "../atoms/BrushSizeButton";

const sizes = [10, 20, 35];

interface BrushSizePaletteProps {
  brushSize: number;
  onSelectSize: (size: number) => void;
}

export default function BrushSizePalette({
  brushSize,
  onSelectSize,
}: BrushSizePaletteProps) {
  return (
    <div className="flex flex-wrap items-center w-auto justify-center gap-5">
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
