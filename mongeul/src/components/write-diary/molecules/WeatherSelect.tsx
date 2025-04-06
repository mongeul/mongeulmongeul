"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeather } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { Weather } from "@/types/diaryTypes";
import WebModal from "../../common/atoms/WebModal";
import WeatherIcon from "@/components/common/atoms/WeatherIcon";

const weathers: Weather[] = ["SUNNY", "CLOUDY", "RAINY", "SNOWY"];

const weatherLabelMap: Record<Weather, string> = {
  SUNNY: "맑음",
  CLOUDY: "흐림",
  RAINY: "비",
  SNOWY: "눈",
};

function ModalContent({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();

  const handleChange = (weather: Weather) => {
    dispatch(setWeather(weather));
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600">오늘의 날씨는 어떤가요?</p>
      <div className="flex justify-center pt-6 pb-4">
        <div className="grid grid-cols-4 gap-2">
          {weathers.map((weather) => (
            <div
              key={weather}
              className="flex flex-col items-center justify-center gap-6 cursor-pointer"
              onClick={() => handleChange(weather)}
            >
              <WeatherIcon weather={weather} size="w-16 h-16" />
              <p className="text-sm text-gray-600">
                {weatherLabelMap[weather]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WeatherSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedWeather: Weather = useSelector(
    (state: RootState) => state.diary.weather
  );

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={toggleModal}
        className="flex flex-col items-center justify-center gap-2 cursor-pointer"
      >
        <WeatherIcon weather={selectedWeather} size="w-20 h-20" />
        <p className="text-xs text-zinc-400">오늘의 날씨</p>
      </div>

      {isModalOpen && (
        <WebModal onClose={toggleModal}>
          <ModalContent closeModal={toggleModal} />
        </WebModal>
      )}
    </>
  );
}
