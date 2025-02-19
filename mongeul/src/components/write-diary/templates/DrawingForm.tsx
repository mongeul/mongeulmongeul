import Canvas from "../organisms/Canvas";
import DrawingToolCard from "../organisms/DrawingToolCard";

export default function DrawingForm() {
  return (
    <div className="max-w-[500px] h-full flex flex-col items-center gap-4 m-2">
      <Canvas />
      <DrawingToolCard />
    </div>
  );
}
