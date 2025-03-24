import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DraftItemSkeleton() {
  return (
    <div className="p-4 w-full rounded-3xl h-auto bg-white">
      <Skeleton width="40%" height={20} />
      <Skeleton width="100%" height={25} />
    </div>
  );
}
