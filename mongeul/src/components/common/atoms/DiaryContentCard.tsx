import Card from "@/components/common/atoms/Card";

interface DiaryContentCardProps {
  content: string;
}

export default function DiaryContentCard({ content }: DiaryContentCardProps) {
  return (
    <Card width="w-full">
      <div className="w-full">{content}</div>
    </Card>
  );
}
