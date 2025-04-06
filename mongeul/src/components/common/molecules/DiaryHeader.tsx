import Card from "@/components/common/atoms/Card";
import DiaryTitle from "../atoms/DiaryTitle";
import DiaryDate from "../atoms/DiaryDate";
import { Weather, Feeling, PrivateStatus } from "@/types/diaryTypes";
import DiaryFeelingIcon from "../atoms/DiaryFeelingIcon";
import DiaryWeatherIcon from "../atoms/DiaryWeatherIcon";
import DiaryPrivateStatusIcon from "../atoms/DiaryPrivateStatusIcon";

interface DiaryHeaderProps {
  weather: Weather;
  feeling: Feeling;
  privateStatus: PrivateStatus;
  title: string;
  date: string;
}

export default function DiaryHeader({
  weather,
  feeling,
  privateStatus,
  title,
  date,
}: DiaryHeaderProps) {
  return (
    <Card width="w-full">
      <div className="w-full flex flex-col justify-center gap-2">
        <div className="flex flex-row gap-2">
          <div className="w-auto h-auto flex items-center justify-center">
            <DiaryFeelingIcon feeling={feeling} />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row h-auto">
              <DiaryWeatherIcon weather={weather} />
              <DiaryPrivateStatusIcon privateStatus={privateStatus} />
            </div>
            <div>
              <DiaryDate date={date} />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200" />
        <div className="flex w-full justify-center items-center">
          <DiaryTitle title={title} />
        </div>
      </div>
    </Card>
  );
}
