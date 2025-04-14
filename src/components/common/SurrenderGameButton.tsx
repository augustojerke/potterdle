"use client";
import { Ban, Trash } from "lucide-react";
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
import { useSurrenderChallenge } from "@/app/actions/challenge-actions";

export function SurrenderGameButton() {
  const [open, setOpen] = useState(false);

  const gameContext = useGame();
  const router = useRouter();
  const { mutateAsync: surrender, isPending } = useSurrenderChallenge();

  async function handleSurrenderGame() {
    if (gameContext.gameChallenge) {
      await surrender(gameContext.gameChallenge);
    }
    gameContext.resetGame();
    setOpen(false);
    router.push("/dashboard");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="mr-2 bg-red-600 text-white hover:bg-red-500"
          variant="default"
          onClick={() => setOpen(true)}
        >
          <Ban className="w-4 h-4" />
          Surrender
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Surrender</DialogTitle>
          <DialogDescription>
            Are you sure you want to surrender?<br></br>
            {gameContext.gameChallenge && (
              <strong className="font-bold">
                20 to {gameContext.gameChallenge.challenger_user.username}, -10
                points to you.
              </strong>
            )}
            {!gameContext.gameChallenge && (
              <strong className="font-bold">
                This action does not lose points
              </strong>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-500"
            variant="secondary"
            onClick={() => handleSurrenderGame()}
            loading={isPending}
            disabled={isPending}
          >
            <Ban />
            Surrender
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
