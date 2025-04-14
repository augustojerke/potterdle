"use client";

import { UserProfile } from "@/components/common/UserProfile";
import { UserActions } from "@/components/common/UserActions";
import { ChallengeTabs } from "@/components/common/ChallengeTabs";
import { Separator } from "@/components/ui/separator";
import { FunFacts } from "@/components/common/FunFacts";
import { useUser } from "@/app/actions/user-actions";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function Page() {
  const { data: user, isLoading, error } = useUser();

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-10">
        <LoadingSpinner color="text-white" />
      </div>
    );
  if (error || !user) return <div>Erro ao carregar dados do usuário</div>;

  return (
    <div>
      <div className="p-5 flex flex-col xl:flex-row justify-evenly items-center gap-10">
        <div className="flex justify-center items-center gap-5">
          <UserProfile
            username={user.username}
            house={user.house}
            points={user.points}
          />
          <UserActions />
        </div>
        <FunFacts />
      </div>
      <div className="w-full px-5">
        <Separator className="mb-5" />
        <ChallengeTabs />
      </div>
    </div>
  );
}
