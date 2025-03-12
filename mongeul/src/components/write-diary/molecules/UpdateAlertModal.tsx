import Button from "@/components/common/atoms/Button";
import WebModal from "@/components/common/atoms/WebModal";

export default function UpdateAlertModal({
  closeModal,
  onConfirm,
  date,
}: {
  closeModal: () => void;
  onConfirm: () => void;
  date: string;
}) {
  return (
    <WebModal onClose={closeModal}>
      <div className="flex flex-col justify-center items-center gap-4">
        <p>이미 일기가 작성된 날짜 입니다.</p>
        <div className="flex flex-col justify-center items-center">
          <p>
            임시저장 일기를 가지고
            <span className="text-theme-600"> {date}</span>의
          </p>
          <p>수정페이지로 이동할까요?</p>
        </div>
        <div className="flex gap-4">
          <Button text={"확인"} onClick={onConfirm} textColor="text-white" />
          <Button
            text={"취소"}
            onClick={closeModal}
            backgroundColor="bg-white"
            borderColor="border border-theme-400"
            textColor="text-theme-400"
          />
        </div>
      </div>
    </WebModal>
  );
}
