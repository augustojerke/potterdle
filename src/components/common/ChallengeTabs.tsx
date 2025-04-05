import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GamesList } from "./GamesList";

export function ChallengeTabs() {
  return (
    <Tabs defaultValue="games" className="w-full">
      <TabsList className="w-full flex">
        <TabsTrigger value="games" className="flex-1 text-center">
          Games
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex-1 text-center">
          Challenges Completed
        </TabsTrigger>
        <TabsTrigger value="pending" className="flex-1 text-center">
          Challenges Pending
        </TabsTrigger>
        <TabsTrigger value="received" className="flex-1 text-center">
          Challenges Received
        </TabsTrigger>
      </TabsList>
      <TabsContent value="games">
        <div className="w-full">
          <GamesList />
        </div>
      </TabsContent>
      <TabsContent value="completed">
        <div className="w-full"></div>
      </TabsContent>
      <TabsContent value="pending">
        <div className="w-full"></div>
      </TabsContent>
      <TabsContent value="received">
        <div className="w-full"></div>
      </TabsContent>
    </Tabs>
  );
}
