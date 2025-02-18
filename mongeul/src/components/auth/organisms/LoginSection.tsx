"use client";

import Divider from "@/components/auth/atoms/Divider";
import SocialLoginButtons from "@/components/auth/molecules/SocialLoginButtons";

export default function LoginSection() {
  return (
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
      <Divider />
      <SocialLoginButtons />
    </div>
  );
}
