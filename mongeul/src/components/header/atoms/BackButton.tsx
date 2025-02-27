import BackIcon from "@/assets/icons/back.svg";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };

  return (
    <div onClick={onClick}>
      <BackIcon className="w-6 h-6 text-zinc-400" />
    </div>
  );
}
