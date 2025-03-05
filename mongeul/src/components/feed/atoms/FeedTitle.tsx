interface FeedTitle {
  title: string;
}

export default function FeedTitle({ title }: FeedTitle) {
  return <span className="text-center">{title}</span>;
}
