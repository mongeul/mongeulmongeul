import { useDispatch, useSelector } from "react-redux";
import Input from "../../common/atoms/Input";
import { RootState } from "@/store/store";
import { setTitle } from "@/store/diarySlice";

export default function TitleCard() {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.diary.title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, 20);
    dispatch(setTitle(newValue));
  };

  return (
    <div className="w-full">
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={handleChange}
        maxLength={20}
      />
    </div>
  );
}
