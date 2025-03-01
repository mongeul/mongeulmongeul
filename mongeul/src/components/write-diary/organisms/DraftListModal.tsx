import WebModal from "@/components/common/atoms/WebModal";
import DraftList from "../molecules/DraftList";

interface DraftListModalProps {
  onClose: () => void;
}

export default function DraftListModal({ onClose }: DraftListModalProps) {
  return (
    <WebModal onClose={onClose}>
      <div>
        <div>임시 저장 목록</div>
        <DraftList />
      </div>
    </WebModal>
  );
}
