import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

type ModalProps = {
    isOpen: boolean
}

export function Modal({isOpen} : ModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ceate Game</DialogTitle>
          <DialogDescription>Choose options to start game</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name">Lobby Name</Label>
            <Input id="name" placeholder="Eagles" className="col-span-3" />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="username">Number of rounds</Label>
            <Input type="number" placeholder="5" id="username" className="col-span-3" />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="private">Privacy</Label>
            <div className="flex col-span-3 gap-x-4" >
                <div className="flex items-center gap-x-1">
                    <input id="private" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800" />
                    <Label htmlFor="private">Privacy</Label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input id="public" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:ring-offset-gray-800" />
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
