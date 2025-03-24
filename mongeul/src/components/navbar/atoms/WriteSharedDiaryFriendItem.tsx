import Button from "@/components/common/atoms/Button";
import { useRouter } from "next/navigation";

interface WriteSharedDiaryFriendItemProps {
  nickname: string;
  groupId: number;
}

export default function WriteSharedDiaryFriendItem({
  nickname,
  groupId,
}: WriteSharedDiaryFriendItemProps) {
  const router = useRouter();

  const handleClick = () => {
    console.log(`친구 클릭 ${nickname} ${groupId}`);
    router.push(`/write-diary?groupid=${groupId}`);
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
