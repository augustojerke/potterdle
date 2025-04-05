"use client";
import { LogOut, Play } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGame } from "@/contexts/GameContext";

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
    <div className="flex-col gap-4">
      <button
        onClick={() => handlePlay()}
        className="w-30 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-5"
      >
        <Play size={20} />
        Play
      </button>
      <button
        onClick={() => handleSignOut()}
        className="w-30 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}
