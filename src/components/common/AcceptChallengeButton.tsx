"use client";
import { CircleCheck, CircleX, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useState } from "react";

export function AcceptChallengeButton() {
  const [open, setOpen] = useState(false);

  function handleAcceptChallenge() {}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="mr-2 bg-green-600 text-white hover:bg-green-500 border-ring border-2"
          variant="default"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <CircleCheck className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Accept Challenge</DialogTitle>
          <DialogDescription>
            Are you sure you want to accept this challenge?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button variant="secondary" onClick={() => handleAcceptChallenge()}>
            Start Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
