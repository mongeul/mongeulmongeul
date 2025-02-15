import { useDispatch, useSelector } from "react-redux";
import Textarea from "../atoms/Textarea";
import { setContent } from "@/store/diarySlice";
import { RootState } from "@/store/store";

export default function ContentCard() {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.diary.content);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setContent(e.target.value));
  };
  return (
    <div className="w-full md:w-1/3">
      <Textarea
        placeholder="오늘 하루를 글로 기록해보세요"
        value={content}
        onChange={handleChange}
      />
    </div>
  );
}
