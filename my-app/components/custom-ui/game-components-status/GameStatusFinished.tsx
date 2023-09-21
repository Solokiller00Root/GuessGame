'use client'

import { useRouter } from "next/navigation";
import CustomButton from "../CustomButton";
import { useState, useEffect } from "react";
import ModalFinishedGame from "../ModalFinishedGame";
import Confetti from 'react-confetti'




export default function GameStatusFinished(  ) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);


  



  useEffect(() => {
    setShowModal(true);
    
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  }



 


   
  return (
        <div>
          <div className=" z-10 ">
            {showModal && (
              <div>
                <div className="absolute top-0 left-0 w-full h-full z-60">
               <Confetti width={window.innerWidth}
      height={window.innerHeight} tweenDuration={10000}  numberOfPieces={200} recycle={false} />
             </div>
              <ModalFinishedGame
                isOpen={showModal}
                title="Congratulations! "
                description="You have completed the game."
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
               
             </div>
            )}
            
          </div>
        </div>
  )
}