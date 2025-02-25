"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWeather } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { Weather } from "@/types/diaryTypes";
import { getWeatherIcon } from "@/utils/uiUtils";
import WebModal from "../../common/atoms/WebModal";

const weathers: Weather[] = ["SUNNY", "CLOUDY", "RAINY"];

function ModalContent({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();

  const handleChange = (weather: Weather) => {
    dispatch(setWeather(weather));
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600">오늘의 날씨는 어떤가요?</p>
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-3 gap-8">
          {weathers.map((weather, index) => {
            const { icon, label } = getWeatherIcon(weather);
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                onClick={() => handleChange(weather)}
              >
                {icon}
                <p className="text-sm text-gray-600">{label}</p>
              </div>
            );
          })}
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

  const { icon, label } = getWeatherIcon(selectedWeather);

  return (
    <>
      <div
        onClick={toggleModal}
        className="flex flex-col items-center justify-center gap-2 cursor-pointer"
      >
        {icon}
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
