"use client";
import { Trash } from "lucide-react";
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

export function DeleteGameButton(props: { id: string }) {
  const [open, setOpen] = useState(false);
  const { mutateAsync: deleteGame, isPending } = useDeleteGame();

  const queryClient = useQueryClient();

  function handleDeleteGame() {
    deleteGame(
      {
        id: props.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["games"] });
          setOpen(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="mr-2 bg-red-600 text-white hover:bg-red-500"
          variant="default"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Game</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this game?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            className="bg-red-600 text-white hover:bg-red-500"
            variant="secondary"
            onClick={() => handleDeleteGame()}
            loading={isPending}
            disabled={isPending}
          >
            <Trash />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
