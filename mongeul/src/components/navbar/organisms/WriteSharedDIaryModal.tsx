import WebModal from "@/components/common/atoms/WebModal";
import WriteSharedDiaryFriendList from "../molecules/WriteSharedDiaryFriendList";

interface WriteSharedDiaryModalProps {
  onClose: () => void;
}

export default function WriteSharedDiaryModal({
  onClose,
}: WriteSharedDiaryModalProps) {
  return (
    <WebModal onClose={onClose}>
      <div className="w-60 flex flex-col justify-center items-center gap-6">
        <p>공유 일기 작성</p>
        <WriteSharedDiaryFriendList />
      </div>
    </WebModal>
  );
}
