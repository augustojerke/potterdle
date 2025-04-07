import { Game } from "@prisma/client";

export async function GamesList() {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/game");
  const games = await response.json();

  if (games.lenght == 0) {
    return <h1>No games played...</h1>;
  }

  return (
    <div className="grid grid-cols-4">
      {games.map((game: Game) => (
        <h1 key={game.id}>{game.id}</h1>
      ))}
    </div>
  );
}
