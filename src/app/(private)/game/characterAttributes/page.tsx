"use client";
import { SelectCharacters } from "@/components/common/SelectCharacters";
import { Button } from "@/components/ui/button";
import charactersData from "@/app/data/characters.json";
import { useState } from "react";

const characters: Character[] = charactersData;

export default function CharacterAttributes() {
  const randomIndex = Math.floor(Math.random() * characters.length);
  const randomCharacter = characters[randomIndex];

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const [guesses, setGuesses] = useState<Character[]>([]);

  const handleGuess = () => {
    if (!selectedCharacterId) return;

    const guessedCharacter = characters.find(
      (char) => char.id === selectedCharacterId
    );
    if (guessedCharacter) {
      setGuesses((prevGuesses) => [guessedCharacter, ...prevGuesses]);
    }
  };

  const attributes = [
    { label: "Species", key: "species" },
    { label: "Gender", key: "gender" },
    { label: "House", key: "house" },
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

  return (
    <div className="px-10 pb-7">
      <h1 className="text-center text-card-foreground text-2xl font-bold mt-5">
        Guess the Character
      </h1>
      <p className="text-muted-foreground text-center mt-3 mb-10">
        Choose a character to try to guess who the chosen character is. When all
        characteristics are correct, you win.
      </p>
      <div className="flex justify-center items-center px-40 gap-5">
        <SelectCharacters onChange={(id) => setSelectedCharacterId(id)} />
        <Button onClick={handleGuess} className="h-15">
          Guess
        </Button>
      </div>

      {guesses.length > 0 && (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-500 text-center rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-500 px-3 py-2 w-32">
                  Character
                </th>
                {attributes.map(({ label }) => (
                  <th
                    key={label}
                    className="border border-gray-500 px-3 py-2 w-32"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guesses.map((guess, index) => (
                <tr key={index} className="bg-gray-800 text-white">
                  <td className="border border-gray-500 px-3 py-2">
                    <img
                      src={guess.image}
                      alt={guess.name}
                      className="w-20 h-20 rounded-full mx-auto"
                    />
                  </td>
                  {attributes.map(({ key }) => {
                    const isCorrect =
                      guess[key as keyof Character] ===
                      randomCharacter[key as keyof Character];
                    return (
                      <td
                        key={key}
                        className={`border border-gray-500 px-3 py-2 font-bold w-32 ${
                          isCorrect ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {formatValue(guess[key as keyof Character])}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
