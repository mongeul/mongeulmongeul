interface FeedDate {
  date: string;
}

export default function FeedTitle({ date }: FeedDate) {
  return <span className="text-sm">{date}</span>;
}
