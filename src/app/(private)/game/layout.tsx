import { GameProvider } from "@/contexts/GameContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}
