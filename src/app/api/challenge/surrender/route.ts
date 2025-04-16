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

  const pointsForUserWinnerBySurrender = 20;
  await prisma.user.update({
    where: { id: data.challenger_user_id },
    data: { points: { increment: pointsForUserWinnerBySurrender } },
  });

  const pointsForUserLoserBySurrender = -10;

  const loser = await prisma.user.findUnique({
    where: { id: data.challenged_user_id },
    select: { points: true },
  });

  const newLoserPoints = Math.max(
    (loser?.points || 0) + pointsForUserLoserBySurrender,
    0
  );
  await prisma.user.update({
    where: { id: data.challenged_user_id },
    data: { points: newLoserPoints },
  });

  await prisma.history.create({
    data: {
      user_id: data.challenger_user_id,
      description: `You received 20 points for ${data.challenged_user.username} surrender your challenge`,
      points: 20,
    },
  });
  await prisma.history.create({
    data: {
      user_id: data.challenger_user_id,
      description: `You lost 10 points for surrender a challenge from ${data.challenger_user.username}`,
      points: -10,
    },
  });

  return NextResponse.json("ok");
}
