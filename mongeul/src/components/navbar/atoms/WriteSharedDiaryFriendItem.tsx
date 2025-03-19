import Button from "@/components/common/atoms/Button";

interface WriteSharedDiaryFriendItemProps {
  nickname: string;
  friendId: number;
}

export default function WriteSharedDiaryFriendItem({
  nickname,
  friendId,
}: WriteSharedDiaryFriendItemProps) {
  const handleClick = () => {
    console.log(`친구 클릭 ${nickname} ${friendId}`);
  };
  return (
    <Button
      width="w-full"
      borderColor="border border-theme-400"
      backgroundColor="bg-white"
      textColor="text-theme-400"
      padding="p-2"
      text={nickname}
      onClick={handleClick}
    />
  );
}
