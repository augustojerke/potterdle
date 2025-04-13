"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { useGame } from "@/contexts/GameContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SelectCharacters } from "@/components/common/SelectCharacters";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import charactersData from "@/app/data/characters.json";

const characters: Character[] = charactersData;

export default function CharacterImage() {
  const router = useRouter();
  const [componentMounted, setComponentMounted] = useState(false);

  const { incrementAttempts, setGame2Character, gameChallenge } = useGame();

  const [randomCharacter, setRandomCharacter] =
    useLocalStorage<Character | null>("randomCharacterGame2", null);
  const [attempts, setAttempts] = useLocalStorage<number>("attemptsGame2", 0);
  const [gameIsFinished, setGameIsFinished] = useLocalStorage<boolean>(
    "gameIsFinishedGame2",
    false
  );
  const [errorMessage, setErrorMessage] = useLocalStorage<string>(
    "errorMessageGame2",
    ""
  );

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    if (!randomCharacter && !gameChallenge) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      setRandomCharacter(characters[randomIndex]);
    } else {
      const char = characters.find(
        (char) => char.id === gameChallenge?.game.game_2_character_id
      );
      if (char) {
        setRandomCharacter(char);
      }
    }
  }, [randomCharacter, setRandomCharacter]);

  const maxBlur = 16;
  const blurReductionPerAttempt = 2;
  const blurValue = gameIsFinished
    ? 0
    : Math.max(maxBlur - attempts * blurReductionPerAttempt, 0);

  function handleGuess() {
    if (!selectedCharacterId || !randomCharacter) return;

    const guessedCharacter = characters.find(
      (char) => char.id === selectedCharacterId
    );

    if (guessedCharacter) {
      setAttempts(attempts + 1);

      if (guessedCharacter.id === randomCharacter.id) {
        setGameIsFinished(true);
        setErrorMessage("");
        setGame2Character(randomCharacter);
        incrementAttempts(attempts);
        setIsDialogOpen(true);
      } else {
        setErrorMessage("Wrong guess, try again!");
      }
    }
  }

  useEffect(() => {
    if (blurValue === 0 && !gameIsFinished) {
      setGameIsFinished(true);
      setErrorMessage("You lost! The character was " + randomCharacter?.name);

      if (randomCharacter) {
        setGame2Character(randomCharacter);
      }

      incrementAttempts(10);
      setIsDialogOpen(true);
    }
  }, [blurValue, gameIsFinished, randomCharacter]);

  if (!componentMounted) {
    return (
      <div className="flex items-center justify-center py-10">
        <LoadingSpinner color="text-secundary" />
      </div>
    );
  }

  return (
    <div className="px-10 pb-7">
      <h1 className="text-center text-card-foreground text-2xl font-bold mt-5">
        Game 2 - Guess the Character Image
      </h1>
      <p className="text-muted-foreground text-center mt-3 mb-10">
        Try to guess which character is blurred. With each attempt, it will
        become clearer.
      </p>

      {randomCharacter && (
        <div className="flex justify-center mb-6">
          <img
            src={randomCharacter.image}
            alt={randomCharacter.name}
            style={{ filter: `blur(${blurValue}px)` }}
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
      )}

      {errorMessage && (
        <p className="text-center text-red-500 font-medium mb-4">
          {errorMessage}
        </p>
      )}

      {gameIsFinished && (
        <div className="flex flex-col justify-center items-center mt-8 w-full mb-5">
          <h1 className="text-green-600 text-center font-bold">
            {randomCharacter?.name}
          </h1>
          <p className="text-green-600 text-center mb-4">
            Congratulations, you got it right wizard!
          </p>
          <Button onClick={() => router.push("/game/spells")}>
            <ArrowRight className="mr-2" />
            Next Game
          </Button>
        </div>
      )}

      <div
        hidden={gameIsFinished}
        className="flex justify-center items-center px-40 gap-5"
      >
        <SelectCharacters
          onChange={(id) => setSelectedCharacterId(id)}
          showImage={false}
        />
        <Button onClick={handleGuess} className="h-15">
          Guess
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription className="text-xl">
              You guessed <b>{randomCharacter?.name}</b> correctly in {attempts}{" "}
              attempts!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center my-4">
            {randomCharacter?.image && (
              <img
                src={randomCharacter.image}
                alt={randomCharacter.name}
                className="w-32 h-32 rounded-full shadow-lg"
              />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => router.push("/game/spells")}>
              <ArrowRight />
              Next Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
