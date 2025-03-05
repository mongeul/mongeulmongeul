interface DiaryTitleProps {
  title: string;
}

export default function DiaryTitle({ title }: DiaryTitleProps) {
  return <span className="text-center">{title}</span>;
}
