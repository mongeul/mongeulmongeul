import Button from "@/components/common/atoms/Button";
import WebModal from "@/components/common/atoms/WebModal";
import { submitDiary } from "@/lib/api/write-diary";
import { resetDiary } from "@/store/diarySlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { useDispatch, useSelector } from "react-redux";

interface TempAlertModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function TempAlertModal({
  onConfirm,
  onCancel,
}: TempAlertModalProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    title,
    content,
    drawing,
    drawingLines,
    date,
    weather,
    feeling,
    privateStatus,
  } = useSelector((state: RootState) => state.diary);

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

    startTransition(async () => {
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
        router.back();
      } catch (error) {
        console.error("일기 작성 실패:", error);
      }
    });
  }

  const clearDiary = () => {
    dispatch(resetDiary());
  };
  return (
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
            onClick={onConfirm}
            text={"작성 취소"}
            backgroundColor="bg-white"
            textColor="text-theme-500"
            borderColor="border border-theme-500"
          />
        </div>
      </div>
    </WebModal>
  );
}
