import { createContext, useContext, useState, ReactNode } from "react";

interface GameContextData {
  game1Character: string;
  game1Attempts: number;
  setGame1Character: (value: string) => void;
  setGame1Attempts: (value: number) => void;

  game2Character: string;
  game2Attempts: number;
  setGame2Character: (value: string) => void;
  setGame2Attempts: (value: number) => void;

  game3Character: string;
  game3Attempts: number;
  setGame3Character: (value: string) => void;
  setGame3Attempts: (value: number) => void;
}

const GameContext = createContext<GameContextData | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [game1Character, setGame1Character] = useState("");
  const [game1Attempts, setGame1Attempts] = useState(0);

  const [game2Character, setGame2Character] = useState("");
  const [game2Attempts, setGame2Attempts] = useState(0);

  const [game3Character, setGame3Character] = useState("");
  const [game3Attempts, setGame3Attempts] = useState(0);

  return (
    <GameContext.Provider
      value={{
        game1Character,
        game1Attempts,
        setGame1Character,
        setGame1Attempts,

        game2Character,
        game2Attempts,
        setGame2Character,
        setGame2Attempts,

        game3Character,
        game3Attempts,
        setGame3Character,
        setGame3Attempts,
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
