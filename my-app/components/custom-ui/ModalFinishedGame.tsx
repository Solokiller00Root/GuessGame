import { ReactNode, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ModalPropsType = {
  children: ReactNode;
  title: string; //join game, create game
  description: string; // Choose options to start game, Write password to join game
  isOpen: boolean;
};

export default function ModalFinishedGame({
  children,
  title,
  description,
  isOpen,
}: ModalPropsType) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  return (
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
  );
}