import WebModal from "@/components/common/atoms/WebModal";
import DraftList from "../molecules/DraftList";

interface DraftListModalProps {
  onClose: () => void;
}

export default function DraftListModal({ onClose }: DraftListModalProps) {
  return (
    <WebModal padding="" onClose={onClose}>
      <div className="w-72 flex flex-col justify-center items-center gap-4">
        <div className="text-sm">임시 저장 목록</div>
        <DraftList />
      </div>
    </WebModal>
  );
}
