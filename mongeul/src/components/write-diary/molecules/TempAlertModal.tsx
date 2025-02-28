import Button from "@/components/common/atoms/Button";
import WebModal from "@/components/common/atoms/WebModal";
import { submitDiary } from "@/lib/api/write-diary";
import { resetDiary } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TempAlertModal() {
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
    drawing,
    drawingLines,
    weather,
    feeling,
    privateStatus,
  } = useSelector((state: RootState) => state.diary);

  const isDirty =
    title || content || drawing || drawingLines || weather || feeling;

  // 임시저장
  async function handleSubmit() {
    if (
      !title &&
      !content &&
      !date &&
      !weather &&
      !feeling &&
      !drawingLines &&
      !drawing
    ) {
      alert("작성한 일기가 없습니다.");
      return;
    }

    try {
      await submitDiary({
        title,
        content,
        picture: drawing || "",
        pictureLines:
          typeof drawingLines === "string"
            ? JSON.parse(drawingLines)
            : drawingLines,
        date,
        weather,
        feeling,
        privateStatus,
        published: true,
      });

      dispatch(resetDiary());
      setIsOpen(false);

      if (pendingNavigation) {
        pendingNavigation();
        setPendingNavigation(null);
      } else {
        router.back();
      }
    } catch (error) {
      console.error("일기 작성 실패:", error);
    }
  }

  // 작성취소
  function clearDiary() {
    dispatch(resetDiary());
    setIsOpen(false);

    if (pendingNavigation) {
      pendingNavigation();
      setPendingNavigation(null);
    } else {
      router.back();
    }
  }

  // 새로고침 감지
  useEffect(() => {
    const handleUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
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
      isFirstRender.current = false;
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (isDirty) {
        setIsOpen(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isDirty]);

  // 페이지 이동 감지 (router.push / router.replace 오버라이드)
  useEffect(() => {
    const confirmNavigation = (
      originalFunction: (href: string, options?: { scroll?: boolean }) => void,
      href: string,
      options?: { scroll?: boolean }
    ) => {
      if (isDirty) {
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
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <WebModal onClose={onCancel}>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="text-lg font-semibold">
              일기가 아직 저장되지 않았어요!
            </div>
            <div className="text-gray-500 flex flex-col justify-center items-center gap-2">
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
