import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, { params }) {
  const session = await getServerSession(authOptions);
  const userGames = await prisma.userGame.findMany({
    where: {
      user_id: session?.user.id,
    },
  });

  return NextResponse.json(userGames);
}

export async function POST(req: NextRequest) {
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
  console.log(session);

  const userGame = await prisma.userGame.create({
    data: {
      user_id: session?.user.id,
      game_id: data.game_id,
      attempts: data.attempts,
    },
  });

  return NextResponse.json(userGame);
}
