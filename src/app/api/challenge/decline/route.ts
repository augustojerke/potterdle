import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Usuário precisa estar autenticado!",
      },
      {
        status: 400,
      }
    );
  }
  await prisma.challenge.update({
    where: { id: data.id },
    data: { is_finished: true, winner_user_id: data.challenger_user_id },
  });

  const pointsForUserWinnerByDecline = 5;
  await prisma.user.update({
    where: { id: data.challenger_user_id },
    data: { points: { increment: pointsForUserWinnerByDecline } },
  });

  const pointsForUserLoserByDecline = -3;
  await prisma.user.update({
    where: { id: data.challenged_user_id },
    data: { points: { increment: pointsForUserLoserByDecline } },
  });

  return NextResponse.json("ok");
}
