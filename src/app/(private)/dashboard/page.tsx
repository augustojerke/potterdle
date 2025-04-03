import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { UserProfile } from "@/components/common/UserProfile";
import { UserActions } from "@/components/common/UserActions";
import { ChallengeTabs } from "@/components/common/ChallengeTabs";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div>
      <div className="p-5 flex justify-between items-start">
        <UserProfile
          username={session?.user.username}
          house={user.house}
          points={user.points}
        />
        <UserActions />
      </div>
      <div className="w-full px-5">
        <Separator className="mb-5" />
        <ChallengeTabs />
      </div>
    </div>
  );
}
