"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamesList } from "./GamesList";
import { useChallenges } from "@/app/actions/challenge-actions";
import { useSession } from "next-auth/react";
import { ReceivedChallegeList } from "./ReceivedChallengeList";
import { BadgeCheck, MailOpen, Gamepad2, NotebookPen } from "lucide-react";
import { CompletedChallengesList } from "./CompletedChallengesList";
import { useHistory } from "@/app/actions/history-actions";
import { HistoryList } from "./HistoryList";

export function ChallengeTabs() {
  const { data: challanges = [] } = useChallenges();
  const { data: history } = useHistory();
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

        <TabsTrigger value="history" className="flex-1 text-center">
          <NotebookPen className="inline-block w-4 h-4 mr-1 text-amber-700" />
          History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="games">
        <div className="w-full py-4">
          <GamesList />
        </div>
      </TabsContent>

      <TabsContent value="completed">
        <div className="w-full py-4">
          <CompletedChallengesList challenges={finishedChallenges} />
        </div>
      </TabsContent>

      <TabsContent value="received">
        <div className="w-full py-4">
          <ReceivedChallegeList challenges={receivedChallenges} />
        </div>
      </TabsContent>

      <TabsContent value="history">
        <div className="w-full py-4">
          <HistoryList history={history} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
