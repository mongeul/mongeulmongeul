import { useState } from "react";
import Card from "@/components/common/atoms/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WebModal from "../../common/atoms/WebModal";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/store/diarySlice";
import { formatDate } from "@/utils/formatDate";

function ModalContent({ closeModal }: { closeModal: () => void }) {
  const dispatch = useDispatch();

  const selectedDate: string = useSelector(
    (state: RootState) => state.diary.date
  );
  const parsedDate =
    selectedDate && !isNaN(Date.parse(selectedDate))
      ? new Date(selectedDate)
      : new Date();

  const handleChange = (date: Date | null) => {
    if (!date) return;
    const formattedDate = date.toISOString().split("T")[0];
    dispatch(setDate(formattedDate));

    closeModal();
  };

  return (
    <div className="flex items-center">
      <DatePicker
        inline
        selected={parsedDate}
        onChange={handleChange}
        maxDate={new Date()}
      />
    </div>
  );
}

export default function DateInputCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedDate: string =
    useSelector((state: RootState) => state.diary.date) ??
    new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const toggleModal = (): void => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div className="w-full" onClick={() => toggleModal()}>
        <Card width="w-full">
          <div className="flex justify-center items-center w-full">
            {formatDate(selectedDate)}
          </div>
        </Card>
      </div>

      {isModalOpen && (
        // <MobileModal onClose={toggleModal}>
        //   <ModalContent />
        // </MobileModal>
        <WebModal onClose={toggleModal} padding="p-2">
          <ModalContent closeModal={toggleModal} />
        </WebModal>
      )}
    </>
  );
}
