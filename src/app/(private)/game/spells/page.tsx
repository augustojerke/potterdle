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
import { useFinishChallenge } from "@/app/actions/challenge-actions";
import { FinishGameDialog } from "@/components/common/FinishGameDialog";
import { motion, AnimatePresence } from "framer-motion";

const spells: Spell[] = spellsData;

export default function Spells() {
  const router = useRouter();

  const [guesses, setGuesses] = useState<string[]>([]);
  const { mutateAsync: create, isPending: isLoadingCreateGame } =
    useCreateGame();

  const { mutateAsync: finish, isPending: isPendingFinish } =
    useFinishChallenge();

  const [componentMouted, setComponentMouted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        !localStorage.getItem("gameIsFinishedGame2") ||
        localStorage.getItem("gameIsFinishedGame2") == "false"
      ) {
        router.push("/game/characterImage");
      }
    }

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
  const [isDialogOpenFinish, setIsDialogOpenFinish] = useState(false);

  useEffect(() => {
    if (!randomSpell && !gameContext.gameChallenge) {
      const randomIndex = Math.floor(Math.random() * spells.length);
      setRandomSpell(spells[randomIndex]);
    } else {
      const spell = spells.find(
        (spell) => spell.id === gameContext.gameChallenge?.game.game_3_spell_id
      );
      if (spell) {
        setRandomSpell(spell);
      }
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
    gameContext.incrementAttempts(1);

    setGuesses((prev) => [...prev, selectedSpellId]);

    if (selectedSpellId === randomSpell.id) {
      setGameIsFinished(true);
      gameContext.setGame3Spell(randomSpell);
      setIsDialogOpen(true);
    } else {
      setErrorMessage("Incorrect! Try again.");
    }
  }

  function handleFinishGame() {
    if (!gameContext.gameChallenge) {
      const data: any = {
        game_1_character_id: gameContext.game1Character?.id,
        game_2_character_id: gameContext.game2Character?.id,
        game_3_spell_id: gameContext.game3Spell?.id,
        attempts: gameContext.attempts,
      };
      create(data, {
        onSuccess: () => {
          router.push("/dashboard");
        },
      });
    } else {
      const data: any = {
        game_1_character_id: gameContext.game1Character?.id,
        game_2_character_id: gameContext.game2Character?.id,
        game_3_spell_id: gameContext.game3Spell?.id,
        attempts: gameContext.attempts,
        gameChallenge: gameContext.gameChallenge,
      };
      finish(data, {
        onSuccess: () => {
          setIsDialogOpen(false);
          setIsDialogOpenFinish(true);
        },
      });
    }
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
        <motion.div
          key={randomSpell.description}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-gray-300 bg-background p-4 rounded-md shadow-md text-center italic text-lg mx-auto max-w-lg"
        >
          "{randomSpell.description}"
        </motion.div>
      )}

      {errorMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-500 font-medium mb-4 mt-5"
        >
          {errorMessage}
        </motion.p>
      )}

      <AnimatePresence>
        {guesses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            {guesses.map((guessId, index) => {
              const spell = spells.find((s) => s.id === guessId);
              const isCorrect = guessId === randomSpell?.id;

              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`px-4 py-2 rounded-md shadow-md text-white font-medium ${
                    isCorrect ? "bg-green-600" : "bg-red-500"
                  }`}
                >
                  {spell?.name}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {gameIsFinished && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center mt-8 w-full mb-5"
        >
          <h1 className="text-green-600 text-center font-bold text-xl">
            {randomSpell?.name}
          </h1>
          <p className="text-green-600 text-center mb-4">
            Congratulations, you got it right wizard!
          </p>
          <Button className="mt-5" onClick={handleFinishGame}>
            <Flag className="mr-2" />
            Finish Game
          </Button>
        </motion.div>
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

      <FinishGameDialog
        open={isDialogOpenFinish}
        onOpenChange={setIsDialogOpenFinish}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="text-xl">
              You guessed <b>{randomSpell?.name}</b> correctly in {attempts}{" "}
              attempts!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              disabled={isLoadingCreateGame || isPendingFinish}
              loading={isLoadingCreateGame || isPendingFinish}
              onClick={handleFinishGame}
            >
              <Flag />
              Finish Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
