import Textarea from "../atoms/Textarea";

export default function ContentCard() {
  return (
    <div className="w-full md:w-1/3">
      <Textarea placeholder="오늘 하루를 글로 기록해보세요" />
    </div>
  );
}
