import Card from "@/components/common/atoms/Card";
import Spinner from "@/components/common/atoms/Spinner";

export default function DiarySubmitSpinner() {
  return (
    <Card>
      <div className="flex flex-col justify-center items-center gap-8 px-8 py-6">
        <p>일기를 작성중입니다.</p>
        <Spinner />
      </div>
    </Card>
  );
}
