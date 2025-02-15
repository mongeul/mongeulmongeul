"use client";

import { useState } from "react";
import Card from "../../card";
import RoundIcon from "../atoms/RoundIcon";

import LockedIcon from "@/assets/icons/locked.svg";
import UnlockedIcon from "@/assets/icons/unlocked.svg";
import EmotionSelect from "../molecules/EmotionSelect";
import DisclosureSelect from "../molecules/DisclosureSelect";
import WeatherSelect from "../molecules/WeatherSelect";

export default function IconCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card width="w-full md:w-1/3">
        <div className="flex flex-row items-center justify-evenly py-1 w-full">
          <EmotionSelect />
          <WeatherSelect />
          <DisclosureSelect />
        </div>
      </Card>
    </>
  );
}
