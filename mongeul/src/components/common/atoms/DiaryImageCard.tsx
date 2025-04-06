import Image from "next/image";
import Card from "./Card";
import { useState } from "react";
import Spinner from "./Spinner";

interface DiaryImageCardProps {
  picture: string;
}

export default function DiaryImageCard({ picture }: DiaryImageCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {picture && (
        <Card width="w-full" className="relative">
          <div className="relative w-full aspect-[192/125]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/50">
                <Spinner />
              </div>
            )}
            <Image
              src={picture}
              alt="이미지"
              fill
              className="object-cover"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </Card>
      )}
    </>
  );
}
