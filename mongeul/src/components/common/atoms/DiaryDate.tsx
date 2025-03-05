interface DiaryDateProps {
  date: string;
}

export default function DiaryDate({ date }: DiaryDateProps) {
  return <span className="text-sm">{date}</span>;
}
