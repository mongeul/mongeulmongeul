import Card from "@/components/common/atoms/Card";
import FontSelectList from "../molecules/FontSelectList";
import FontSizeController from "../molecules/FontSizeController";

export default function FontSelectCard() {
  return (
    <Card
      width="w-full flex flex-col justify-center items-center gap-12"
      padding="px-4 py-6"
    >
      <FontSizeController />
      <FontSelectList />
    </Card>
  );
}
