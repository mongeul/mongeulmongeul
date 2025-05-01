"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { handleKakaoLogin } from "@/lib/api/auth";
import NicknameModal from "@/components/auth/molecules/NicknameModal";
import Spinner from "@/components/common/atoms/Spinner";

export default function KakaoCallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    if (sessionStorage.getItem("usedKakaoCode") === code) return;
    sessionStorage.setItem("usedKakaoCode", code);

    handleKakaoLogin(code, dispatch)
      .then((user) => {
        if (user?.nickname === null) {
          setIsModalOpen(true);
        } else {
          router.push("/feed");
        }
      })
      .catch(() => {
        sessionStorage.removeItem("usedKakaoCode");
        router.push("/");
      });
  }, [searchParams, dispatch, router]);

  useEffect(() => {
    if (user.nickname && isModalOpen) {
      setIsModalOpen(false);
      router.replace("/feed");
    }
  }, [user.nickname, isModalOpen, router]);

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
      {isModalOpen && (
        <NicknameModal
          isOpen
          onClose={() => {
            setIsModalOpen(false);
            router.push("/diary");
          }}
        />
      )}
    </>
  );
}
