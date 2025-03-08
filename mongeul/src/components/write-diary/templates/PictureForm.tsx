"use client";

import Canvas from "../organisms/Canvas";
import PictureToolCard from "../organisms/PictureToolCard";

export default function PictureForm() {
  return (
    <div className="max-w-[500px] h-full flex flex-col justiry-center items-center gap-4 m-2">
      <Canvas />
      <PictureToolCard />
    </div>
  );
}
