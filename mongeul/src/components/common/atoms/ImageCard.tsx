import Image from "next/image";
import Card from "./Card";

interface ImageCardProps {
  picture: string;
}

export default function ImageCard({ picture }: ImageCardProps) {
  return (
    <>
      {picture && (
        <Card width="w-full" className="relative">
          <div className="relative w-full aspect-[1/1]">
            <Image src={picture} alt="이미지" fill className="object-cover" />
          </div>
        </Card>
      )}
    </>
  );
}
