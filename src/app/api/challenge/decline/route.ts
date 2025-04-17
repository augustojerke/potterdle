import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

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

  const loser = await prisma.user.findUnique({
    where: { id: data.challenged_user_id },
    select: { points: true },
  });

  const newLoserPoints = Math.max(
    (loser?.points || 0) + pointsForUserLoserByDecline,
    0
  );

  await prisma.user.update({
    where: { id: data.challenged_user_id },
    data: { points: newLoserPoints },
  });

  await prisma.history.create({
    data: {
      user_id: data.challenger_user_id,
      description: `You received 5 points for ${data.challenged_user.username} rejecting your challenge`,
      points: 5,
    },
  });
  await prisma.history.create({
    data: {
      user_id: data.challenged_user_id,
      description: `You lost 3 points for refusing a challenge from ${data.challenger_user.username}`,
      points: -3,
    },
  });

  return NextResponse.json("ok");
}
