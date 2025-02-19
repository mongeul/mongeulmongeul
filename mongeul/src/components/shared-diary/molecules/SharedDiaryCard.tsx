import Card from "@/components/common/atoms/Card";

interface SharedDiaryCardProps {
  name: string;
  writer: string;
  date: string;
  duration: number;
}

export default function SharedDiaryCard({
  name,
  writer,
  date,
  duration,
}: SharedDiaryCardProps) {
  return (
    <Card
      borderColor="border-gray-200"
      width="w-full max-w-2xl mx-auto"
      roundSize="rounded-3xl"
    >
      <div className="flex flex-col w-full p-4 bg-white">
        <div className="text-lg font-bold text-blue-500">{name}</div>
        <p className="text-sm text-gray-600 mt-1">
          {duration}일 동안 3편의 일기를 주고받았어요!
        </p>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-gray-700">
            <span className="font-semibold">최근 작성자:</span> {writer}
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-semibold">최근 작성일:</span> {date}
          </div>
        </div>
      </div>
    </Card>
  );
}
