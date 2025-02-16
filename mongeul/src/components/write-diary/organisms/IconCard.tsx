import Card from "@/components/Card";
import DisclosureSelect from "../molecules/DisclosureSelect";
import WeatherSelect from "../molecules/WeatherSelect";
import FeelingsSelect from "../molecules/FeelingsSelect";

export default function IconCard() {
  return (
    <>
      <Card width="w-full">
        <div className="flex flex-row items-center justify-evenly py-1 w-full">
          <FeelingsSelect />
          <WeatherSelect />
          <DisclosureSelect />
        </div>
      </Card>
    </>
  );
}
