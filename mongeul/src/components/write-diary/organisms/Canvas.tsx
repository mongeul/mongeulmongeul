import dynamic from "next/dynamic";

const KonvaCanvas = dynamic(() => import("./KonvaCanvas"), { ssr: false });

export default function Canvas({ stageRef }: { stageRef: any }) {
  return (
    <div>
      <KonvaCanvas stageRef={stageRef} />
    </div>
  );
}
