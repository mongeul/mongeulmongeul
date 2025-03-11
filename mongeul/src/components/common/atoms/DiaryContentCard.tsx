import Card from "@/components/common/atoms/Card";

interface DiaryContentCardProps {
  content: string;
}

export default function DiaryContentCard({ content }: DiaryContentCardProps) {
  return (
    <Card width="w-full" padding="px-6 py-5">
      <div className="w-full whitespace-pre-line">{content}</div>
    </Card>
  );
}
