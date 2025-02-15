"use-client";

import { useState, useEffect } from "react";
import Card from "../../card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WebModal from "../atoms/WebModal";

function ModalContent() {
  return (
    <div className="flex items-center">
      <DatePicker inline />
    </div>
  );
}

export default function DateInputCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const now = new Date();
    setSelectedDate(
      now.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const toggleModal = (): void => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div className="w-full md:w-1/3" onClick={() => toggleModal()}>
        <Card width="w-full">
          <div className="flex justify-center items-center w-full">
            {selectedDate}
          </div>
        </Card>
      </div>

      {isModalOpen && (
        // <MobileModal onClose={toggleModal}>
        //   <ModalContent />
        // </MobileModal>
        <WebModal onClose={toggleModal}>
          <ModalContent />
        </WebModal>
      )}
    </>
  );
}
