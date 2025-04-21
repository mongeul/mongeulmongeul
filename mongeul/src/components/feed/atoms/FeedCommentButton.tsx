import CommentIcon from "@/assets/icons/comment.svg";

interface Props {
  onClick?: () => void;
}

export default function FeedCommentButton({ onClick }: Props) {
  return (
    <button onClick={onClick}>
      <CommentIcon className="h-6 w-6 text-theme-400 justify-center items-center" />
    </button>
  );
}
