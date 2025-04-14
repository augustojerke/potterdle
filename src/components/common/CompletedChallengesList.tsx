"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import clsx from "clsx";

interface CompleteChallengeListProps {
  challenges: Challenge[];
}

export function CompletedChallengesList(props: CompleteChallengeListProps) {
  if (!props.challenges || props.challenges.length === 0) {
    return <h1>No Challenges Completed...</h1>;
  }

  function getHouseColor(house: string) {
    switch (house.toLowerCase()) {
      case "gryffindor":
        return "bg-red-700 text-yellow-300";
      case "slytherin":
        return "bg-green-700 text-white";
      case "ravenclaw":
        return "bg-blue-700 text-white";
      case "hufflepuff":
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-500 text-white";
    }
  }

  function getRank(points: number) {
    if (points >= 100)
      return { rank: "Dark Lord", color: "bg-black text-white" };
    if (points >= 80)
      return { rank: "Minister of Magic", color: "bg-purple-700 text-white" };
    if (points >= 60)
      return { rank: "Professor", color: "bg-indigo-600 text-white" };
    if (points >= 40)
      return { rank: "Wizard", color: "bg-blue-600 text-white" };
    if (points >= 20)
      return { rank: "Apprentice", color: "bg-green-500 text-white" };
    return { rank: "Muggle", color: "bg-gray-500 text-white" };
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead>Challenger User</TableHead>
            <TableHead>Challenge Status</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.challenges.map((challenge: Challenge) => {
            const user = challenge.challenger_user;
            const houseColor = getHouseColor(user.house);
            const { rank, color: rankColor } = getRank(user.points);

            return (
              <TableRow key={challenge.id}>
                <TableCell className="flex gap-1">
                  <span className="font-semibold mt-1 mr-5">
                    {user.username}
                  </span>
                  <span
                    className={clsx(
                      "px-4 py-1 mt-1 rounded-full text-xs font-semibold w-fit",
                      houseColor
                    )}
                  >
                    {user.house}
                  </span>
                  <span
                    className={clsx(
                      "px-4 py-1 mt-1 rounded-full text-xs font-semibold w-fit",
                      rankColor
                    )}
                  >
                    {rank} ({user.points} pts)
                  </span>
                </TableCell>
                <TableCell>
                  <GameStatus winner_id={challenge.winner_user_id} />
                </TableCell>
                <TableCell className="text-right space-x-2"></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

import { useSession } from "next-auth/react";
function GameStatus(winner_id: any) {
  const { data: session } = useSession();
  console.log(winner_id.winner_id, session?.user.id);

  if (winner_id.winner_id == session?.user.id)
    return <span className="text-green-600 font-bold">Win</span>;
  else return <span className="text-red-600 font-bold">Lose</span>;
}
