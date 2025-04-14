import { SurrenderGameButton } from "@/components/common/SurrenderGameButton";
import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <div className="flex justify-end p-2">
        <SurrenderGameButton />
      </div>
    </div>
  );
}
