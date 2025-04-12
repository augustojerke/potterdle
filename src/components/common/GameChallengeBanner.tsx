"use client";
import { useGame } from "@/contexts/GameContext";

export function GameChallengeBanner() {
  const gameContext = useGame();

  if (!gameContext.gameChallenge) return null;

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-xl">
        You are in a Challenge Game from{" "}
        <b>{gameContext.gameChallenge.challenger_user.username}</b>
      </h1>
    </div>
  );
}
