import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { X } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ceate Game</DialogTitle>
          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-stone-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-stone-100 data-[state=open]:text-stone-500 dark:ring-offset-stone-950 dark:focus:ring-stone-300 dark:data-[state=open]:bg-stone-800 dark:data-[state=open]:text-stone-400"
            onClick={onClose}
          >
            <X className="w-4 h-4 " />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name">Lobby Name</Label>
            <Input id="name" placeholder="Eagles" className="col-span-3" />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username">Number of rounds</Label>
            <Input
              type="number"
              placeholder="5"
              id="username"
              className="col-span-3"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="private">Privacy</Label>
            <div className="flex col-span-3 gap-x-4">
              <div className="flex items-center gap-x-1">
                <input
                  id="private"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800"
                />
                <Label htmlFor="private">Privacy</Label>
              </div>
              <div className="flex items-center gap-x-1">
                <input
                  id="public"
                  type="radio"
                  value=""
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800"
                />
                <Label htmlFor="public">Privacy</Label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create Lobby</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
