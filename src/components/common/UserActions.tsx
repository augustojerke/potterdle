"use client";
import { LogOut, Play, Star } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGame } from "@/contexts/GameContext";
import { Button } from "../ui/button";

export function UserActions() {
  const router = useRouter();
  const { resetGame } = useGame();

  function handleSignOut() {
    if (typeof window !== "undefined") {
      localStorage.clear();
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

  return (
    <div className="flex flex-col items-center justify-center py-2 gap-4">
      <Button
        onClick={() => handlePlay()}
        className="w-50 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        <Play size={20} />
        Play
      </Button>
      <Button className="w-50 flex items-center gap-2 px-4 py-2">
        <Star size={20} />
        Ranking
      </Button>
      <Button
        onClick={() => handleSignOut()}
        className="w-50 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        <LogOut size={20} />
        Logout
      </Button>
    </div>
  );
}
