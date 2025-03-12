import ThemePreviewCard from "../organisms/ThemePreviewCard";
import ThemeSelectCard from "../organisms/ThemeSelectCard";

export default function ThemeTemplates() {
  return (
    <div className="w-full flex flex-col gap-6">
      <ThemePreviewCard />
      <ThemeSelectCard />
    </div>
  );
}
