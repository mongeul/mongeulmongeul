import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WriteSharedDiaryItemSkeleton() {
  return (
    <div className="w-full rounded-3xl h-auto bg-white items-center justify-center">
      <Skeleton width="100%" height={40} borderRadius={20} />
    </div>
  );
}
