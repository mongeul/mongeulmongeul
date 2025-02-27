import Card from "@/components/common/atoms/Card";
import PrivateStatusSelect from "../molecules/PrivateStatusSelect";
import WeatherSelect from "../molecules/WeatherSelect";
import FeelingSelect from "../molecules/FeelingSelect";

export default function IconCard() {
  return (
    <>
      <Card width="w-full">
        <div className="flex flex-row items-center justify-evenly py-1 w-full">
          <FeelingSelect />
          <WeatherSelect />
          <PrivateStatusSelect />
        </div>
      </Card>
    </>
  );
}
