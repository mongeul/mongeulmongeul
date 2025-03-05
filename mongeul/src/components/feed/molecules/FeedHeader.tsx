import Card from "@/components/common/atoms/Card";
import FeedTitle from "../atoms/FeedTitle";
import FeedDate from "../atoms/FeedDate";
import { Weather, Feeling, PrivateStatus } from "@/types/diaryTypes";
import FeedFeelingIcon from "../atoms/FeedFeelingIcon";
import FeedWeatherIcon from "../atoms/FeedWeatherIcon";
import FeedPrivateStatusIcon from "../atoms/FeedPrivateStatusIcon";

interface FeedHeaderProps {
  weather: Weather;
  feeling: Feeling;
  privateStatus: PrivateStatus;
  title: string;
  date: string;
}

export default function FeedHeader({
  weather,
  feeling,
  privateStatus,
  title,
  date,
}: FeedHeaderProps) {
  return (
    <Card width="w-full">
      <div className="w-full flex flex-col justify-center gap-2">
        <div className="flex flex-row gap-4">
          <div className="w-auto h-auto flex items-center justify-center">
            <FeedFeelingIcon feeling={feeling} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 h-auto">
              <FeedWeatherIcon weather={weather} />
              <FeedPrivateStatusIcon privateStatus={privateStatus} />
            </div>
            <div className="">
              <FeedDate date={date} />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200" />
        <div className="flex w-full justify-center items-center">
          <FeedTitle title={title} />
        </div>
      </div>
    </Card>
  );
}
