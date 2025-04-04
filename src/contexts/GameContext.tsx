"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface GameContextData {
  attempts: number;
  incrementAttempts: (value: number) => void;

  game1Character: Character | undefined;
  setGame1Character: (value: Character) => void;

  game2Character: Character | undefined;
  setGame2Character: (value: Character) => void;
}

const GameContext = createContext<GameContextData | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [attempts, setAttempts] = useState(0);
  const incrementAttempts = (value: number) =>
    setAttempts((prev) => prev + value);

  const [game1Character, setGame1Character] = useState<Character | undefined>();
  const [game2Character, setGame2Character] = useState<Character | undefined>();
  return (
    <GameContext.Provider
      value={{
        attempts,
        incrementAttempts,

        game1Character,
        setGame1Character,

        game2Character,
        setGame2Character,
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
