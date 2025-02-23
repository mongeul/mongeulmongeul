import { useState } from "react";
import RoundIcon from "../../common/atoms/RoundIcon";
import MobileModal from "../../common/atoms/MobileModal";
import WeatherIcon from "@/assets/icons/weather.svg";
import WebModal from "../../common/atoms/WebModal";
import { Weather } from "@/types/diaryTypes";
import { setWeather } from "@/store/diarySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const weathers: Weather[] = ["sunny", "cloudy", "rainy"];

const getWeatherIcon = (weather: Weather) => {
  switch (weather) {
    case "sunny":
      return (
        <RoundIcon backgroundColor="bg-theme-200">
          <WeatherIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );

    case "cloudy":
      return (
        <RoundIcon backgroundColor="bg-theme-300">
          <WeatherIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );
    case "rainy":
      return (
        <RoundIcon backgroundColor="bg-theme-400">
          <WeatherIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );
    default:
      return (
        <RoundIcon backgroundColor="bg-zinc-300">
          <WeatherIcon className="text-white h-9 w-9" />
        </RoundIcon>
      );
  }
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
      <div className="flex justify-center p-6">
        <div className="grid grid-cols-3 gap-8">
          {weathers.map((weather, index) => (
            <div
              key={index}
              className="text-3xl"
              onClick={() => handleChange(weather)}
            >
              {getWeatherIcon(weather)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WeatherSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedWeather: Weather =
    useSelector((state: RootState) => state.diary.weather) ?? "";

  const toggleModal = (): void => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div
        onClick={() => {
          toggleModal();
        }}
        className="flex flex-col items-center justify-center gap-2"
      >
        {getWeatherIcon(selectedWeather)}
        <p className="text-xs text-zinc-400">오늘의 날씨</p>
      </div>

      {isModalOpen && (
        // <MobileModal onClose={toggleModal}>
        //   <ModalContent />
        // </MobileModal>
        <WebModal onClose={toggleModal}>
          <ModalContent closeModal={toggleModal} />
        </WebModal>
      )}
    </>
  );
}
