import ContentCard from "../organisms/ContentCard";
import DateInputCard from "../organisms/DateInputCard";
import DrawingCard from "../organisms/DrawingCard";
import IconCard from "../organisms/IconCard";
import TitleCard from "../organisms/TitleCard";

export default function WriteForm() {
  return (
    <div className="flex flex-col w-full gap-4">
      <DateInputCard />
      <IconCard />
      <TitleCard />
      <DrawingCard />
      <ContentCard />
    </div>
  );
}
