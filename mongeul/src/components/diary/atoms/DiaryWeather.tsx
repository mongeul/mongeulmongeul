"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import WeatherIcon from "@/assets/icons/weather.svg";
import { useEffect, useState } from "react";

const DiaryWeather: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  const [imageExists, setImageExists] = useState(true);
  const pngPath = selectedDiary
    ? `/assets/weather/${selectedDiary.weather}.png`
    : "";

  useEffect(() => {
    if (!pngPath) return;
    const checkImageExists = async () => {
      try {
        const response = await fetch(pngPath, { method: "HEAD" });
        if (!response.ok) throw new Error("Image not found");
        setImageExists(true);
      } catch {
        setImageExists(false);
      }
    };

    checkImageExists();
  }, [pngPath]);

  if (!selectedDiary) return null;

  return (
    <div className="w-6 h-6">
      {imageExists ? (
        <Image
          src={pngPath}
          alt={selectedDiary.weather}
          width={24}
          height={24}
          className="opacity-70"
        />
      ) : (
        <Image
          src={WeatherIcon.src}
          alt="Default Weather Icon"
          width={24}
          height={24}
          className="opacity-70"
        />
      )}
    </div>
  );
};

export default DiaryWeather;
