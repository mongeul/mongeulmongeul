import Card from "@/components/common/atoms/Card";
import Link from "next/link";

export default function DrawingCard() {
  return (
    <div className="w-full h-72">
      <Link href="/write-diary/drawing" prefetch={false}>
        <Card width="w-full" height="h-full">
          <div className="w-full h-full flex justify-center text-zinc-400">
            오늘 하루를 그림으로 남겨보세요
          </div>
        </Card>
      </Link>
    </div>
  );
}
