"use client";

import Image, { StaticImageData } from "next/image";

interface SocialLoginButtonProps {
  icon: StaticImageData | string;
  alt: string;
  onClick: () => void;
}

export default function SocialLoginButton({
  icon,
  alt,
  onClick,
}: SocialLoginButtonProps) {
  return (
    <button onClick={onClick} className="p-2 rounded-full hover:opacity-80">
      <Image
        src={icon}
        alt={alt}
        width={64}
        height={64}
        className="w-14 h-14 sm:w-16 sm:h-16"
      />
    </button>
  );
}
