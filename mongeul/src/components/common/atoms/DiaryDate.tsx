import { formatDate } from "@/utils/formatDate";

interface DiaryDateProps {
  date: string;
}

export default function DiaryDate({ date }: DiaryDateProps) {
  return <span className="text-sm">{formatDate(date)}</span>;
}
