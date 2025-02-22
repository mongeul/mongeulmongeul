import Slider from "../atoms/Slider";
import Label from "../atoms/Label";

interface FontSizeControllerProps {
  value: number;
  onChange: (value: number) => void;
}

export default function FontSizeController({
  value,
  onChange,
}: FontSizeControllerProps) {
  return (
    <div className="flex items-center justify-between w-80">
      <Label size="small" />
      <div className="relative w-full mx-4">
        <div className="absolute top-1/2 w-full h-1 bg-gray-300 rounded-full transform -translate-y-1/2"></div>
        <Slider min={12} max={32} step={2} value={value} onChange={onChange} />
      </div>
      <Label size="large" />
    </div>
  );
}
