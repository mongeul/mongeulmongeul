import WebModal from "@/components/common/atoms/WebModal";
import DraftList from "../molecules/DraftList";

interface DraftListModalProps {
  onClose: () => void;
}

export default function DraftListModal({ onClose }: DraftListModalProps) {
  return (
    <WebModal padding="" onClose={onClose}>
      <div className="text-sm pb-2 flex justify-center">임시 저장 목록</div>
      <div className="w-80 max-h-96 flex flex-col items-center gap-4 overflow-y-auto scrollbar-hide">
        <div className="w-full flex-grow">
          <DraftList onClose={onClose} />
        </div>
      </div>
    </WebModal>
  );
}
