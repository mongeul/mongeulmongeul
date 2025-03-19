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
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <p>교환 일기 작성</p>
        <p className="text-sm">
          지금 교환일기를 작성할 수 있는 친구목록이에요!
        </p>
        <WriteSharedDiaryFriendList />
      </div>
    </WebModal>
  );
}
