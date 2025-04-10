"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamesList } from "./GamesList";
import { useChallenges } from "@/app/actions/challenge-actions";
import { useSession } from "next-auth/react";
import { ReceivedChallegeList } from "./ReceivedChallengeList";
import { BadgeCheck, Hourglass, MailOpen, Gamepad2 } from "lucide-react";

export function ChallengeTabs() {
  const { data: challanges = [] } = useChallenges();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const finishedChallenges = challanges.filter((c: Challenge) => c.is_finished);
  const receivedChallenges = challanges.filter(
    (c: Challenge) => c.challenged_user_id === userId && !c.is_finished
  );

  return (
    <Tabs defaultValue="games" className="w-full">
      <TabsList className="w-full flex">
        <TabsTrigger value="games" className="flex-1 text-center">
          <Gamepad2 className="inline-block w-4 h-4 mr-1" />
          Games
        </TabsTrigger>

        <TabsTrigger
          value="completed"
          className="flex-1 text-center"
          disabled={finishedChallenges.length === 0}
        >
          <BadgeCheck className="inline-block w-4 h-4 mr-1 text-green-600" />
          Completed ({finishedChallenges.length})
        </TabsTrigger>

        <TabsTrigger
          value="received"
          className="flex-1 text-center"
          disabled={receivedChallenges.length === 0}
        >
          <MailOpen className="inline-block w-4 h-4 mr-1 text-blue-500" />
          Received ({receivedChallenges.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="games">
        <div className="w-full py-4">
          <GamesList />
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="w-full py-4">
          {/* Componente de desafios finalizados, se houver */}
        </div>
      </TabsContent>

      <TabsContent value="received">
        <div className="w-full py-4">
          <ReceivedChallegeList challenges={receivedChallenges} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
