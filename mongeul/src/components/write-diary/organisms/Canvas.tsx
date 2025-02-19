"use client";

import dynamic from "next/dynamic";

const KonvaCanvas = dynamic(() => import("./KonvaCanvas"), { ssr: false });

export default function Canvas() {
  return (
    <div>
      <KonvaCanvas />
    </div>
  );
}
