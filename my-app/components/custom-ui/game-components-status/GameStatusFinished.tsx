'use client'

import { useRouter } from "next/navigation";
import CustomButton from "../CustomButton";
import { useState, useEffect } from "react";

import ModalFinishedGame from "../ModalFinishedGame";

export default function GameStatusFinished() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
    
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-6 w-full md:w-2/3">
  {showModal && (
    <ModalFinishedGame
      isOpen={showModal}
      title="You finished "
      description="Congratulations! You have completed the game."
    >
      <div className="flex justify-end">
        <button className="x-button" onClick={handleCloseModal}>
          X
        </button>
      </div>
      <h1 className="text-2xl font-bold md:text-4xl">Game is finished!</h1>
      <div>
        <CustomButton
          handleClick={() => {
            router.push("/#games");
          }}
        >
          PLAY AGAIN!
        </CustomButton>
      </div>
    </ModalFinishedGame>
  )}
</div>
  );
}