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
  let winnerUserId;
  let loserUserId;
  let pointsForUserWinner;
  let pointsForUserLoser = -10;
  if (data.attempts <= data.gameChallenge.game.attempts) {
    winnerUserId = data.gameChallenge.challenged_user_id;
    loserUserId = data.gameChallenge.challenger_user_id;
    pointsForUserWinner = 20;
  } else {
    winnerUserId = data.gameChallenge.challenger_user_id;
    loserUserId = data.gameChallenge.challenged_user_id;
    pointsForUserWinner = 10;
  }
  await prisma.challenge.update({
    where: { id: data.gameChallenge.id },
    data: { is_finished: true, winner_user_id: winnerUserId },
  });

  await prisma.user.update({
    where: { id: winnerUserId },
    data: { points: { increment: pointsForUserWinner } },
  });

  const loser = await prisma.user.findUnique({
    where: { id: loserUserId },
    select: { points: true },
  });
  const newLoserPoints = Math.max((loser?.points || 0) + pointsForUserLoser, 0);

  await prisma.user.update({
    where: { id: loserUserId },
    data: { points: newLoserPoints },
  });

  const loserInfo = await prisma.user.findUnique({
    where: { id: loserUserId },
  });
  const winnerInfo = await prisma.user.findUnique({
    where: { id: winnerUserId },
  });

  await prisma.history.create({
    data: {
      user_id: winnerUserId,
      description: `You received ${pointsForUserWinner} for winning a challenge from ${loserInfo?.username}`,
      points: pointsForUserWinner,
    },
  });
  await prisma.history.create({
    data: {
      user_id: loserUserId,
      description: `You lost -10 points for losing a challenge from ${winnerInfo?.username}`,
      points: -10,
    },
  });

  return NextResponse.json("ok");
}
