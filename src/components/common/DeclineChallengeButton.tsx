"use client";
import { CircleX } from "lucide-react";
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
import { useDeleteGame } from "@/app/actions/game-actions";
import { useQueryClient } from "@tanstack/react-query";

export function DeclineChallengeButton(props: { id: string }) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteGame, isPending } = useDeleteGame();

  const queryClient = useQueryClient();

  function handleDeclineChallenge() {
    deleteGame(
      {
        id: props.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["challenges"] });
          setOpen(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="mr-2 bg-red-600 text-white hover:bg-red-500 border-ring border-2"
          variant="default"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <CircleX className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Decline Challenge</DialogTitle>
          <DialogDescription>
            Are you sure you want to decline this challenge?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-500"
            variant="secondary"
            onClick={() => handleDeclineChallenge()}
            loading={isPending}
            disabled={isPending}
          >
            <CircleX />
            Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
