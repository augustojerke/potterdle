"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import spellsData from "@/app/data/spells.json";
import { Flag, Wand } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useRouter } from "next/navigation";
import { SelectSpells } from "@/components/common/SelectSpells";
import { useCreateGame } from "@/app/actions/game-actions";

const spells: Spell[] = spellsData;

export default function Spells() {
  const router = useRouter();

  const { mutateAsync: create, isPending: isLoadingCreateGame } =
    useCreateGame();

  const [componentMouted, setComponentMouted] = useState(false);
  useEffect(() => {
    setComponentMouted(true);
  }, []);

  const gameContext = useGame();

  const [randomSpell, setRandomSpell] = useLocalStorage<Spell | null>(
    "randomSpellGame3",
    null
  );
  const [attempts, setAttempts] = useLocalStorage<number>("attemptsGame3", 0);
  const [gameIsFinished, setGameIsFinished] = useLocalStorage<boolean>(
    "gameIsFinishedGame3",
    false
  );
  const [errorMessage, setErrorMessage] = useLocalStorage<string>(
    "errorMessageGame3",
    ""
  );

  const [selectedSpellId, setSelectedSpellId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!randomSpell) {
      const randomIndex = Math.floor(Math.random() * spells.length);
      setRandomSpell(spells[randomIndex]);
    }
  }, [randomSpell, setRandomSpell]);

  function handleGuess() {
    if (!selectedSpellId || !randomSpell) {
      setErrorMessage("Please select a spell!");
      return;
    }

    setErrorMessage("");

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    gameContext.incrementAttempts(newAttempts);

    if (selectedSpellId === randomSpell.id) {
      setGameIsFinished(true);
      gameContext.setGame3Spell(randomSpell);
      setIsDialogOpen(true);
    } else {
      setErrorMessage("Incorrect! Try again.");
    }
  }

  function handleFinishGame() {
    const data: any = {
      game_1_character_id: gameContext.game1Character?.id,
      game_2_character_id: gameContext.game2Character?.id,
      game_3_spell_id: gameContext.game3Spell?.id,
      attempts: gameContext.attempts,
    };
    console.log(data);
    create(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  }

  if (!componentMouted)
    return (
      <div className="flex items-center justify-center py-10">
        <LoadingSpinner color="text-secundary" />
      </div>
    );

  return (
    <div className="px-10 pb-7">
      <div className="flex justify-center items-center gap-3">
        <h1 className="text-center text-card-foreground text-2xl font-bold mt-5">
          Game 3 - Guess the Spell
        </h1>
        <Wand className="mt-5" />
      </div>
      <p className="text-muted-foreground text-center mt-3 mb-8">
        Try to guess which spell is by the description.
      </p>

      {randomSpell && (
        <div className="border border-gray-300 bg-background p-4 rounded-md shadow-md text-center italic text-lg mx-auto max-w-lg">
          "{randomSpell.description}"
        </div>
      )}

      {errorMessage && (
        <p className="text-center text-red-500 font-medium mb-4 mt-5">
          {errorMessage}
        </p>
      )}

      {gameIsFinished && (
        <div className="flex flex-col justify-center items-center mt-8 w-full mb-5">
          <h1 className="text-green-600 text-center font-bold">
            {randomSpell?.name}
          </h1>
          <p className="text-green-600 text-center mb-4">
            Congratulations, you got it right wizard!
          </p>
          <Button className="mt-5" onClick={() => handleFinishGame()}>
            <Flag className="mr-2" />
            Finish Game
          </Button>
        </div>
      )}

      <div
        hidden={gameIsFinished}
        className="flex justify-center items-center px-40 gap-5 mt-10"
      >
        <SelectSpells onChange={(e) => setSelectedSpellId(e)} />
        <Button onClick={handleGuess} className="h-15">
          Guess
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="text-xl">
              You guessed <b>{randomSpell?.name}</b> correctly in {attempts}{" "}
              attempts!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleFinishGame()}>
              <Flag />
              Finish Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
