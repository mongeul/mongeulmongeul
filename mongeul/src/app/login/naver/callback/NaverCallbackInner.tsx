"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { handleNaverLogin } from "@/lib/api/auth";
import NicknameModal from "@/components/auth/molecules/NicknameModal";
import Spinner from "@/components/common/atoms/Spinner";

export default function NaverCallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) return;

    if (sessionStorage.getItem("usedNaverCode") === code) return;
    sessionStorage.setItem("usedNaverCode", code);

    handleNaverLogin(code, state, dispatch)
      .then((user) => {
        if (user?.nickname === null) {
          setIsModalOpen(true);
        } else {
          router.push("/feed");
        }
      })
      .catch(() => {
        sessionStorage.removeItem("usedNaverCode");
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
