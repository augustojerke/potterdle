"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useGame } from "@/contexts/GameContext";
import { useRouter } from "next/navigation";

interface FinishGameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FinishGameDialog({
  open,
  onOpenChange,
}: FinishGameDialogProps) {
  const gameContext = useGame();
  const router = useRouter();
  const [win, setWin] = useState(false);
  useEffect(() => {
    if (gameContext.gameChallenge) {
      setWin(gameContext.attempts <= gameContext.gameChallenge?.game.attempts);
    }
  }, []);

  function handleDashboard() {
    onOpenChange(false);
    gameContext.resetGame();
    router.push("/dashboard");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Challenge Result</DialogTitle>
          <DialogDescription>
            {win && (
              <span className="text-muted-foreground text-sm">
                You <b className="text-green-700">WON</b> the Challenge!
              </span>
            )}
            {!win && (
              <span className="text-muted-foreground text-sm">
                You <b className="text-red-700">LOST</b> the Challenge!
              </span>
            )}
            <br></br>
            <span className="text-muted-foreground text-sm">
              Your Attempts: {gameContext.attempts}
            </span>
            <br></br>
            <span className="text-muted-foreground text-sm">
              {gameContext.gameChallenge?.challenger_user.username} Attempts:{" "}
              {gameContext.gameChallenge?.game.attempts}
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDashboard} variant="secondary">
            Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
