import { ReactQueryProvider } from "@/components/providers/QueryClientProvider";
import { GameProvider } from "@/contexts/GameContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      <ReactQueryProvider>
        <div className="px-40 py-10">
          <div className="border mt-20 rounded bg-card">{children}</div>
        </div>
      </ReactQueryProvider>
    </GameProvider>
  );
}
