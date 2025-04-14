"use client";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

interface FinishGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FinishGameDialog({
  open,
  onOpenChange,
}: FinishGameDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Challenge Result</DialogTitle>
          <DialogDescription>
            Change your wizard name and your house
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
          <Button variant="secondary">
            <Pencil />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
