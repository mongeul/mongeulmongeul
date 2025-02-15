import { useDispatch, useSelector } from "react-redux";
import Input from "../atoms/Input";
import { RootState } from "@/store/store";
import { setTitle } from "@/store/diarySlice";

export default function TitleCard() {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.diary.title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  return (
    <div className="w-full md:w-1/3">
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleChange}
      />
    </div>
  );
}
