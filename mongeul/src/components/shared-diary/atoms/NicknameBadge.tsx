export default function NicknameBadge({ nickname }: { nickname: string }) {
  return (
    <div className="bg-theme-400 text-white font-bold px-4 py-2 rounded-full inline-flex max-w-fit">
      {nickname}
    </div>
  );
}
