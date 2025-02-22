import FontPreviewCard from "../organisms/FontPreviewCard";
import FontSelectCard from "../organisms/FontSelectCard";

export default function FontTemplates() {
  return (
    <div className="w-full flex flex-col gap-6">
      <FontPreviewCard />
      <FontSelectCard />
    </div>
  );
}
