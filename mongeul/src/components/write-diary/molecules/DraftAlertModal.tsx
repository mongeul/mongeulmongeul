"use client";

import Button from "@/components/common/atoms/Button";
import WebModal from "@/components/common/atoms/WebModal";
import { createDiaryDraft, createDiaryEntry } from "@/lib/api/write-diary";
import { resetDiary } from "@/store/diarySlice";
import { resetPicture } from "@/store/pictureSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DraftAlertModal() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void) | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);
  const isFirstRender = useRef(true);

  const {
    title,
    content,
    date,
    picture,
    pictureLines,
    weather,
    feeling,
    privateStatus,
  } = useSelector((state: RootState) => state.diary);

  const isDirty = !!(
    title ||
    content ||
    picture ||
    pictureLines ||
    weather ||
    feeling
  );

  console.log("isDirty 상태:", isDirty);

  // 임시저장
  async function handleSubmit() {
    console.log("handleSubmit() 호출됨");

    if (!isDirty) {
      alert("작성한 일기가 없습니다.");
      return;
    }

    try {
      console.log("submitDiary API 요청 시작");
      await createDiaryDraft({
        title,
        content,
        pictureLines:
          typeof pictureLines === "string"
            ? JSON.parse(pictureLines)
            : pictureLines,
        date,
        weather,
        feeling,
        privateStatus,
      });
      console.log("submitDiary API 요청 완료");

      dispatch(resetDiary());
      dispatch(resetPicture());
      console.log("Redux 상태 resetDiary() 실행됨");

      setIsOpen(false);
      console.log("모달 닫기");

      if (pendingNavigation) {
        console.log("pendingNavigation 실행됨");
        pendingNavigation();
        setPendingNavigation(null);
      } else {
        console.log("router.back() 실행됨");
        router.back();
      }
    } catch (error) {
      console.error("일기 임시저장 실패:", error);
    }
  }

  // 작성취소
  function clearDiary() {
    console.log("clearDiary() 호출됨");

    dispatch(resetDiary());
    dispatch(resetPicture());
    console.log("Redux 상태 resetDiary() 실행됨");

    setIsOpen(false);
    console.log("모달 닫기");

    if (pendingNavigation) {
      console.log("pendingNavigation 실행됨");
      pendingNavigation();
      setPendingNavigation(null);
    } else {
      console.log("router.back() 실행됨");
      router.back();
    }
  }

  // 새로고침 감지
  useEffect(() => {
    const handleUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        console.log("beforeunload 감지됨! (페이지 새로고침)");
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [isDirty]);

  // 뒤로가기 감지
  useEffect(() => {
    if (isFirstRender.current) {
      history.pushState(null, "", location.href);
      console.log("history.pushState() 실행됨");
      isFirstRender.current = false;
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      console.log("popstate 이벤트 감지됨 (뒤로가기)");
      if (isDirty) {
        console.log("isDirty 상태이므로 모달 오픈");
        setIsOpen(true);
      } else {
        router.back();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty, router]);

  // 페이지 이동 감지 (router.push / router.replace 오버라이드)
  useEffect(() => {
    const confirmNavigation = (
      originalFunction: (href: string, options?: { scroll?: boolean }) => void,
      href: string,
      options?: { scroll?: boolean }
    ) => {
      console.log(`confirmNavigation: ${href}`);

      // /write-diary/picture 페이지 예외처리
      if (href === "/write-diary/picture") {
        console.log("/write-diary/picture 이동");
        originalFunction(href, options);
        return;
      }

      if (isDirty) {
        console.log("isDirty 상태이므로 모달 오픈 & 네비게이션 보류");
        setPendingNavigation(() => () => originalFunction(href, options));
        setIsOpen(true);
        return;
      }

      originalFunction(href, options);
    };

    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (href: string, options?: { scroll?: boolean }) =>
      confirmNavigation(originalPush, href, options);
    router.replace = (href: string, options?: { scroll?: boolean }) =>
      confirmNavigation(originalReplace, href, options);

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [isDirty, router]);

  const onCancel = () => {
    console.log("모달 닫기 버튼 클릭됨");
    setIsOpen(false);

    // 현재 페이지 상태를 다시 push하여 뒤로가기가 발생했을 때 다시 감지되도록 함
    history.pushState(null, "", location.href);
  };

  return (
    <>
      {isOpen && (
        <WebModal onClose={onCancel}>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="font-semibold">일기가 아직 저장되지 않았어요!</div>
            <div className="text-gray-500 flex text-sm flex-col justify-center items-center gap-2">
              <div>작성중인 일기를 취소하시겠습니까?</div>
            </div>

            <div className="mt-4 flex justify-evenly gap-4">
              <Button
                onClick={handleSubmit}
                text={"임시 저장"}
                textColor={"text-white"}
              />
              <Button
                onClick={clearDiary}
                text={"작성 취소"}
                backgroundColor="bg-white"
                textColor="text-theme-500"
                borderColor="border border-theme-500"
              />
            </div>
          </div>
        </WebModal>
      )}
    </>
  );
}
