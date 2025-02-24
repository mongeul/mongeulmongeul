import Card from "@/components/common/atoms/Card";
import PrivateStatusSelect from "../molecules/PrivateStatusSelect";
import WeatherSelect from "../molecules/WeatherSelect";
import FeelingsSelect from "../molecules/FeelingsSelect";

export default function IconCard() {
  return (
    <>
      <Card width="w-full">
        <div className="flex flex-row items-center justify-evenly py-1 w-full">
          <FeelingsSelect />
          <WeatherSelect />
          <PrivateStatusSelect />
        </div>
      </Card>
    </>
  );
}
