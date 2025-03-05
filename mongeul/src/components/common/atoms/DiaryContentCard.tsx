import Card from "@/components/common/atoms/Card";

interface DiaryContentCardProps {
  content: string;
}

export default function DiaryContentCard({ content }: DiaryContentCardProps) {
  return (
    <Card>
      <div>{content}</div>
    </Card>
  );
}
