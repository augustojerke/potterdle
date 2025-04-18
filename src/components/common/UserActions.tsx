"use client";
import { LogOut, Pencil, Play, Star } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGame } from "@/contexts/GameContext";
import { Button } from "../ui/button";
import { useState } from "react";
import { EditProfileDialog } from "./EditProfileDialog";
import { useUser } from "@/app/actions/user-actions";
import { useSurrenderChallenge } from "@/app/actions/challenge-actions";

export function UserActions() {
  const { data: user } = useUser();
  const router = useRouter();
  const { resetGame, gameChallenge } = useGame();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { mutateAsync: surrender } = useSurrenderChallenge();

  async function handleSignOut() {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    if (gameChallenge) {
      await surrender(gameChallenge);
    }
    signOut({ callbackUrl: "/login" });
  }

  function handlePlay() {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    resetGame();
    router.push("/game/characterAttributes");
  }

  function handleRanking() {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    router.push("/ranking");
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 gap-4">
      <Button
        onClick={() => handlePlay()}
        className="w-50 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 border-ring border-2"
      >
        <Play size={20} />
        {gameChallenge ? <span>Return to Challenge</span> : <span>Play</span>}
      </Button>
      <Button
        className="w-50 flex items-center gap-2 px-4 py-2 border-ring border-2"
        onClick={() => handleRanking()}
      >
        <Star fill="#facc15" size={20} />
        Ranking
      </Button>
      <Button
        className="w-50 flex items-center gap-2 px-4 py-2 border-ring border-2"
        onClick={() => setOpenEditDialog(true)}
      >
        <Pencil fill="orange" size={20} />
        Edit Profile
      </Button>
      <EditProfileDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        userId={user.id}
        currentName={user.username}
        currentHouse={user.house}
      />
      <Button
        onClick={() => handleSignOut()}
        className="w-50 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 border-ring border-2"
      >
        <LogOut size={20} />
        Logout
      </Button>
    </div>
  );
}
