import { Game } from "@prisma/client";
import charactersData from "@/app/data/characters.json";
import spellsData from "@/app/data/spells.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ButtonChallange } from "./ButtonChallenge";

export async function GamesList() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/game`);
  const games: (Game & { image: string })[] = await response.json();

  if (games.length === 0) {
    return <h1>No games played...</h1>;
  }

  const getCharacter = (id: string) => {
    return charactersData.find((char) => char.id === id);
  };

  const getSpellName = (id: string) => {
    const spell = spellsData.find((s) => s.id === id);
    return spell?.name ?? "Unknown Spell";
  };

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>Game 1 Character</TableHead>
            <TableHead>Game 2 Character</TableHead>
            <TableHead>Game 3 Spell</TableHead>
            <TableHead>Attempts</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => {
            const char1 = getCharacter(game.game_1_character_id);
            const char2 = getCharacter(game.game_2_character_id);

            return (
              <TableRow key={game.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={char1?.image}
                      alt={char1?.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    {char1?.name ?? "Unknown Character"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={char2?.image}
                      alt={char2?.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    {char2?.name ?? "Unknown Character"}
                  </div>
                </TableCell>
                <TableCell>{getSpellName(game.game_3_spell_id)}</TableCell>
                <TableCell>{game.attempts}</TableCell>
                <TableCell className="text-right">
                  <ButtonChallange game={game} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
