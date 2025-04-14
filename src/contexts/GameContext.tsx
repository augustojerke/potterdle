"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface GameContextData {
  attempts: number;
  incrementAttempts: (value: number) => void;

  game1Character: Character | undefined;
  setGame1Character: (value: Character) => void;

  game2Character: Character | undefined;
  setGame2Character: (value: Character) => void;

  game3Spell: Spell | undefined;
  setGame3Spell: (value: Spell) => void;

  gameChallenge: Challenge | null;
  setGameChallenge: (value: Challenge) => void;

  resetGame: () => void;
}

const GameContext = createContext<GameContextData | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [attempts, setAttempts] = useState(0);
  const [game1Character, setGame1Character] = useState<Character | undefined>();
  const [game2Character, setGame2Character] = useState<Character | undefined>();
  const [game3Spell, setGame3Spell] = useState<Spell | undefined>();
  const [gameChallenge, setGameChallenge] = useState<Challenge | null>(null);

  const incrementAttempts = (value: number) => {
    setAttempts((prev) => prev + value);
    console.log(attempts);
  };

  const resetGame = () => {
    setAttempts(0);
    setGame1Character(undefined);
    setGame2Character(undefined);
    setGame3Spell(undefined);
    setGameChallenge(null);
    localStorage.clear();
  };

  return (
    <GameContext.Provider
      value={{
        attempts,
        incrementAttempts,

        game1Character,
        setGame1Character,

        game2Character,
        setGame2Character,

        game3Spell,
        setGame3Spell,

        gameChallenge,
        setGameChallenge,

        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used in GameProvider");
  return context;
};
