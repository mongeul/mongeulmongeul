import { FeedDetail } from "@/types/feedTypes";
import FeedHeader from "../molecules/FeedHeader";
import ContentCard from "../atoms/ContentCard";
import ImageCard from "../atoms/ImageCard";

interface FeedDetailContainerProps {
  feed: FeedDetail;
}

export default function FeedDetailContainer({
  feed,
}: FeedDetailContainerProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <FeedHeader
        weather={feed.weather}
        feeling={feed.feeling}
        privateStatus={feed.privateStatus}
        title={feed.title}
        date={feed.date}
      />
      {feed.picture && <ImageCard picture={feed.picture} />}
      <ContentCard content={feed.content} />
    </div>
  );
}
