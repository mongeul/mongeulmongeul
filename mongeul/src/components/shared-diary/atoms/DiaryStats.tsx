export default function DiaryStats({
  days,
  count,
}: {
  days: number;
  count: number;
}) {
  return (
    <div className="text-gray-700">
      <span className="text-theme-500 font-bold">{days}일</span> 동안
      <br />
      <span className="font-bold">{count}편</span>의 일기를
      <br />
      주고받았어요!
    </div>
  );
}
