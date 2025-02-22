"use client";

import { useState } from "react";
import Card from "@/components/common/atoms/Card";
import FontSelect from "../molecules/FontSelect";
import FontSizeController from "../molecules/FontSizeController";

export default function FontSelectCard() {
  const [fontSize, setFontSize] = useState(16);
  const [selectedFont, setSelectedFont] = useState("suit");

  return (
    <Card width="w-full flex flex-col gap-6">
      <FontSizeController value={fontSize} onChange={setFontSize} />

      <FontSelect selectedFont={selectedFont} onFontChange={setSelectedFont} />
    </Card>
  );
}
