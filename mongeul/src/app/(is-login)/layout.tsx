"use client";

import { useFcmPermission } from "@/hooks/useFcmPermission";
import Header from "@/components/header/orgamisms/Header";
import Navbar from "@/components/navbar/organisms/NavBar";
import ConfirmModal from "@/components/common/atoms/ConfirmModal";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { showModal, onAccept, onReject } = useFcmPermission();

  return (
    <>
      <Header />
      <main className="flex w-full lg:w-2/3 lx:w-1/2 justify-center mx-auto min-h-screen p-4 pb-24">
        {children}
      </main>
      <Navbar />

      {showModal && (
        <ConfirmModal
          isOpen={true}
          message="현재 기기에서 알림을 받으시겠습니까?"
          onConfirm={onAccept}
          onCancel={onReject}
        />
      )}
    </>
  );
}
