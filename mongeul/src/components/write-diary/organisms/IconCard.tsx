import Card from "@/components/Card";
import EmotionSelect from "../molecules/EmotionSelect";
import DisclosureSelect from "../molecules/DisclosureSelect";
import WeatherSelect from "../molecules/WeatherSelect";

export default function IconCard() {
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
