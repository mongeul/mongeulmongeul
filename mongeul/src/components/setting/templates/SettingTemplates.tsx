"use client";
import CategoryCard from "../molecules/CategoryCard";
import WebModal from "@/components/common/atoms/WebModal";
import LogOutModalContent from "../molecules/LogOutModalContent";
import WithdrawModalContent from "../molecules/WithdrawModalContent";
import { useState } from "react";

const PersonalSetting = [
  { label: "닉네임 변경", link: "/setting/nickname" },
  { label: "일기 잠금 설정", link: "/setting/diary-lock" },
  { label: "알림 설정", link: "/setting/notification" },
];
const DisplaySetting = [
  { label: "테마 설정", link: "/setting/theme" },
  { label: "폰트 설정", link: "/setting/font" },
];

export default function SettingTemplates() {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  const openWithdrawModal = () => setIsWithdrawModalOpen(true);
  const closeWithdrawModal = () => setIsWithdrawModalOpen(false);

  const AuthSetting = [
    { label: "로그아웃", action: openLogoutModal },
    { label: "회원 탈퇴", action: openWithdrawModal },
  ];

  return (
    <div className="flex flex-col w-full h-auto gap-6">
      <CategoryCard categories={PersonalSetting} title={"개인 설정"} />
      <CategoryCard categories={DisplaySetting} title={"화면 설정"} />
      <CategoryCard categories={AuthSetting} title={"계정"} />

      {isLogoutModalOpen && (
        <WebModal onClose={closeLogoutModal}>
          <LogOutModalContent onClose={closeLogoutModal} />
        </WebModal>
      )}
      {isWithdrawModalOpen && (
        <WebModal onClose={closeWithdrawModal}>
          <WithdrawModalContent onClose={closeWithdrawModal} />
        </WebModal>
      )}
    </div>
  );
}
