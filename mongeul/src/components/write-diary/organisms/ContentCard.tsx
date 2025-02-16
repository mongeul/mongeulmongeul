import { useDispatch, useSelector } from "react-redux";
import Textarea from "../atoms/Textarea";
import { setContent } from "@/store/diarySlice";
import { RootState } from "@/store/store";

export default function ContentCard() {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.diary.content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.slice(0, 500);
    dispatch(setContent(newValue));
  };
  return (
    <div className="w-full">
      <Textarea
        placeholder="오늘 하루를 글로 기록해보세요"
        value={content}
        onChange={handleChange}
        maxLength={500}
      />
    </div>
  );
}
