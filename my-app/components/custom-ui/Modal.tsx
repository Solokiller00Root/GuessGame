import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalPropsType = {
  children: ReactNode;
  triggerButton: ReactNode;
  title: string; //join game, create game
  description: string; // Choose options to start game, Write password to join game
};

export default function Modal({
  children,
  triggerButton,
  title,
  description,
}: ModalPropsType) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
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
