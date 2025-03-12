import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DiaryDetailSkeleton() {
  return (
    <div className="p-4 w-full h-auto rounded-3xl space-y-4">
      {/* 일기 헤더 */}
      <div className="p-4 w-full rounded-3xl h-auto bg-white">
        <div className="flex w-full items-center space-x-3">
          {/* 기분 */}
          <Skeleton circle width={60} height={60} />
          <div className="flex flex-col h-auto w-full">
            {/* 날씨 및 공개 상태 */}
            <div className="flex flex-row space-x-2">
              <Skeleton circle width={30} height={30} />
              <Skeleton circle width={30} height={30} />
            </div>
            {/* 날짜 */}
            <div className="w-full h-auto">
              <Skeleton width="60%" height={20} />
            </div>
          </div>
        </div>
        {/* 제목 */}
        <div className="space-y-2">
          <Skeleton width="100%" height={25} />
        </div>
      </div>

      {/* 그림일기 영역 */}
      <div className="w-full h-48 bg-white rounded-3xl flex items-center justify-center">
        <Skeleton width="90%" height="90%" />
      </div>

      {/* 다이어리 내용 */}
      <div className="p-4 rounded-3xl bg-white">
        <Skeleton width="80%" height={25} />
        <Skeleton width="90%" height={25} />
        <Skeleton width="70%" height={25} />
      </div>
    </div>
  );
}
