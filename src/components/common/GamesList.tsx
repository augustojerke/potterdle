"use client";
import { useGames } from "@/app/actions/game-actions";
import { Game } from "@prisma/client";

export function GamesList() {
  const { data: games } = useGames();
  console.log(games);
  return (
    <div className="grid grid-cols-4">
      {games.map((game: Game) => (
        <h1 key={game.id}>{game.id}</h1>
      ))}
    </div>
  );
}
