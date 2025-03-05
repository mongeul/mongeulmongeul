import Card from "@/components/common/atoms/Card";

interface ContentCardProps {
  content: string;
}

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <Card>
      <div>{content}</div>
    </Card>
  );
}
