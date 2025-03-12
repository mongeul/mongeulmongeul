export default function RecentAuthor({
  author,
  date,
  isMyTurn,
}: {
  author: string;
  date: string;
  isMyTurn: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`w-20 h-20 ${
          isMyTurn ? "bg-white" : "bg-theme-200"
        } text-black font-bold flex flex-col items-center justify-center rounded-full`}
      >
        <p className="text-xs">최근 작성자</p>
        <p>{author}</p>
      </div>
      <div className="w-20 h-20 bg-theme-300 text-black font-bold flex flex-col items-center justify-center rounded-full">
        <p className="text-xs">최근 작성일</p>
        <p>{date}</p>
      </div>
    </div>
  );
}
