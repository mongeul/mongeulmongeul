"use client";

import Card from "@/components/common/atoms/Card";
import ThemeSelectList from "../molecules/ThemeSelectList";

export default function ThemeSelectCard() {
  return (
    <Card
      width="w-full flex flex-col justify-center items-center gap-12"
      padding="px-4 py-6"
    >
      <ThemeSelectList />
    </Card>
  );
}
