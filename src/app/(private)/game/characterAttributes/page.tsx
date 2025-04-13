"use client";
import { useState, useEffect } from "react";
import { SelectCharacters } from "@/components/common/SelectCharacters";
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
import { ArrowRight } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { GuessTable } from "@/components/common/GuessTable";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useRouter } from "next/navigation";

const characters: Character[] = charactersData;

export default function CharacterAttributes() {
  const router = useRouter();
  const [componentMouted, setComponentMouted] = useState(false);

  const { incrementAttempts, setGame1Character, gameChallenge } = useGame();

  const [randomCharacter, setRandomCharacter] =
    useLocalStorage<Character | null>("randomCharacter", null);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const [guesses, setGuesses] = useLocalStorage<Character[]>("guesses", []);
  const [attempts, setAttempts] = useLocalStorage<number>("attempts", 0);
  const [gameIsFinished, setGameIsFinished] = useLocalStorage<boolean>(
    "gameIsFinished",
    false
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setComponentMouted(true);
  }, []);

  useEffect(() => {
    if (!randomCharacter && !gameChallenge) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      setRandomCharacter(characters[randomIndex]);
    } else {
      const char = characters.find(
        (char) => char.id === gameChallenge?.game.game_1_character_id
      );
      if (char) {
        setRandomCharacter(char);
      }
    }
  }, [randomCharacter, setRandomCharacter]);

  const attributes = [
    { label: "Species", key: "species" },
    { label: "Gender", key: "gender" },
    { label: "House", key: "house" },
    { label: "Ancestry", key: "ancestry" },
    { label: "Year of Birth", key: "yearOfBirth" },
    { label: "Wizard", key: "wizard" },
    { label: "Hair Color", key: "hairColour" },
    { label: "Hogwarts Staff", key: "hogwartsStaff" },
    { label: "Hogwarts Student", key: "hogwartsStudent" },
    { label: "Alive", key: "alive" },
  ];

  const formatValue = (value: any) => {
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "string")
      return value.charAt(0).toUpperCase() + value.slice(1);
    return value;
  };

  const handleGuess = () => {
    setAttempts((prev) => prev + 1);
    if (!selectedCharacterId || !randomCharacter) return;

    const guessedCharacter = characters.find(
      (char) => char.id === selectedCharacterId
    );
    if (guessedCharacter) {
      setGuesses((prevGuesses) => [{ ...guessedCharacter }, ...prevGuesses]);

      const allAttributesCorrect = attributes.every(({ key }) => {
        return (
          guessedCharacter[key as keyof Character] ===
          randomCharacter[key as keyof Character]
        );
      });

      if (allAttributesCorrect) {
        setGameIsFinished(true);
        setGame1Character(randomCharacter);
        incrementAttempts(attempts);
        setIsDialogOpen(true);
      }
    }
  };

  if (!componentMouted)
    return (
      <div className="flex items-center justify-center py-10">
        <LoadingSpinner color="text-secundary" />
      </div>
    );

  return (
    <div className="px-10 pb-7">
      <h1 className="text-center text-card-foreground text-2xl font-bold mt-5">
        Game 1 - Guess the Character
      </h1>
      <p className="text-muted-foreground text-center mt-3 mb-10">
        Choose a character to try to guess who the chosen character is. When all
        characteristics are correct, you win.
      </p>
      <div
        hidden={gameIsFinished}
        className="flex justify-center items-center px-40 gap-5"
      >
        <SelectCharacters onChange={(id) => setSelectedCharacterId(id)} />
        <Button onClick={handleGuess} className="h-15">
          Guess
        </Button>
      </div>

      {gameIsFinished && (
        <div className="flex justify-center items-center mt-8">
          <Button onClick={() => router.push("/game/characterImage")}>
            <ArrowRight />
            Next Game
          </Button>
        </div>
      )}

      {guesses.length > 0 && (
        <GuessTable
          guesses={guesses}
          randomCharacter={randomCharacter}
          attributes={attributes}
          formatValue={formatValue}
        />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Congratulations!</DialogTitle>
            <DialogDescription className="text-xl">
              You guessed <b>{randomCharacter?.name}</b> correctly in {attempts}{" "}
              attempts!
            </DialogDescription>
          </DialogHeader>
          {randomCharacter?.image && (
            <div className="flex justify-center items-center my-4">
              <img
                src={randomCharacter.image}
                alt={randomCharacter.name}
                className="w-32 h-32 rounded-full shadow-lg"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => router.push("/game/characterImage")}>
              <ArrowRight />
              Next Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
