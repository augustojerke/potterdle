"use client";
import { CircleCheck, Play } from "lucide-react";
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
import { useGame } from "@/contexts/GameContext";
import { useRouter } from "next/navigation";

interface AcceptChallengeButtonProps {
  challenge: Challenge;
}

export function AcceptChallengeButton(props: AcceptChallengeButtonProps) {
  const gameContext = useGame();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  function handleAcceptChallenge() {
    gameContext.setGameChallenge(props.challenge);
    router.push("/game/characterAttributes");
  }

  function handleDeclineChallenge() {}

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
            Are you sure you want to accept this challenge?<br></br>
            <strong className="font-bold">
              20 points if you win, -5 points if you lose.
            </strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            className="bg-green-500 hover:bg-green-600"
            variant="secondary"
            onClick={() => handleAcceptChallenge()}
          >
            <Play />
            Start Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
