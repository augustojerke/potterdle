"use client";

import { useUserRanking } from "@/app/actions/user-actions";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { Crown } from "lucide-react";

export default function Ranking() {
  const { data: session } = useSession();
  const { data, isLoading, error } = useUserRanking();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <LoadingSpinner color="text-white" />
      </div>
    );
  }

  if (error || !data)
    return <div className="text-center mt-10">Erro to loading Ranking</div>;

  return (
    <div className="p-5 flex flex-col items-center gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2 text-gray-900 dark:text-white">
          <Crown className="text-yellow-500 w-8 h-8" /> Players Ranking
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Check out the players with the most points!
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <Separator className="mb-6" />

        {data.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No users available for ranking.
          </p>
        ) : (
          <div className="space-y-4">
            {data.map((user: any, index: number) => {
              const isCurrentUser = user.id === session?.user?.id;
              const medal =
                index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : `${index + 1}º`;

              return (
                <div
                  key={user.id}
                  className={`flex items-center justify-between px-5 py-3 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 ${
                    isCurrentUser
                      ? "bg-yellow-100 border border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 font-semibold"
                      : "bg-white border dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl w-10 text-center">{medal}</span>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {user.username}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-800 dark:text-gray-300 font-bold text-lg">
                    {user.points} pts
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
