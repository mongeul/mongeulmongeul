import FontPreviewCard from "../organisms/FontPreviewCard";
import ThemeSelectCard from "../organisms/ThemeSelectCard";

export default function ThemeTemplates() {
  return (
    <div className="w-full flex flex-col gap-6">
      <FontPreviewCard />
      <ThemeSelectCard />
    </div>
  );
}
