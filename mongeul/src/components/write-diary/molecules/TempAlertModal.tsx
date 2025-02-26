import Button from "@/components/common/atoms/Button";
import WebModal from "@/components/common/atoms/WebModal";

interface TempAlertModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function TempAlertModal({
  onConfirm,
  onCancel,
}: TempAlertModalProps) {
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
            onClick={onCancel}
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
