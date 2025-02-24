import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";

const DiaryImage: React.FC = () => {
  const { selectedDiary } = useSelector((state: RootState) => state.calendar);
  if (!selectedDiary || !selectedDiary.painting) return null;

  return <Image src={selectedDiary.painting} alt="Picture Diary" />;
};

export default DiaryImage;
