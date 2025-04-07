"use client";

import { useState } from "react";
import { Swords } from "lucide-react";
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
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import charactersData from "@/app/data/characters.json";
import spellsData from "@/app/data/spells.json";
import { Game } from "@/types/game";

interface ButtonChallangeProps {
  game: Game;
}

export function ButtonChallange({ game }: ButtonChallangeProps) {
  const [open, setOpen] = useState(false);

  const getCharacter = (id: string) =>
    charactersData.find((char) => char.id === id);
  const getSpell = (id: string) => spellsData.find((spell) => spell.id === id);

  const char1 = getCharacter(game.game_1_character_id);
  const char2 = getCharacter(game.game_2_character_id);
  const spell = getSpell(game.game_3_spell_id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="icon" onClick={() => setOpen(true)}>
          <Swords className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl">
        <DialogHeader>
          <DialogTitle>Challenge Game</DialogTitle>
          <DialogDescription>
            Challenge a user with this game. If he completes the game in fewer
            attempts than you,{" "}
            <strong className="font-semibold text-foreground">
              he earns 20 points
            </strong>{" "}
            and
            <strong className="font-semibold text-foreground">
              {" "}
              you lose 10
            </strong>
            . Otherwise,
            <strong className="font-semibold text-foreground">
              {" "}
              you earn 10
            </strong>{" "}
            and
            <strong className="font-semibold text-foreground">
              {" "}
              he loses 10
            </strong>{" "}
            too.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="border-r text-center">
                  <div className="flex items-center justify-center gap-2">
                    {char1?.image && (
                      <img
                        src={char1.image}
                        alt={char1.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    {char1?.name ?? "Unknown"}
                  </div>
                </TableCell>
                <TableCell className="border-r text-center">
                  <div className="flex items-center justify-center gap-2">
                    {char2?.image && (
                      <img
                        src={char2.image}
                        alt={char2.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    {char2?.name ?? "Unknown"}
                  </div>
                </TableCell>
                <TableCell className="border-r text-center">
                  <div className="flex items-center justify-center gap-2">
                    {spell?.name ?? "Unknown"}
                  </div>
                </TableCell>
                <TableCell className="text-center font-medium text-muted-foreground">
                  {game.attempts} attempts
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={() => setOpen(false)}>
            <Swords />
            Challenge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
