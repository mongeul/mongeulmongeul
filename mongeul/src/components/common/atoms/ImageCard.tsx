import Image from "next/image";

interface ImageCardProps {
  picture: string;
}

export default function ImageCard({ picture }: ImageCardProps) {
  return <Image src={picture} alt={"이미지"}></Image>;
}
