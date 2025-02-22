"use client";

import { useState } from "react";
import Card from "@/components/common/atoms/Card";
import FontSelectList from "../molecules/FontSelectList";
import FontSizeController from "../molecules/FontSizeController";

export default function FontSelectCard() {
  const [fontSize, setFontSize] = useState(16);

  return (
    <Card
      width="w-full flex flex-col justify-center items-center gap-12"
      padding="px-4 py-6"
    >
      <FontSizeController value={fontSize} onChange={setFontSize} />
      <FontSelectList />
    </Card>
  );
}
