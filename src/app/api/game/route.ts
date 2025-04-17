import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, { params }: any) {
  const session = await getServerSession(authOptions);
  const games = await prisma.game.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return NextResponse.json(games);
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

  const game = await prisma.game.create({
    data: {
      game_1_character_id: data.game_1_character_id,
      game_2_character_id: data.game_2_character_id,
      game_3_spell_id: data.game_3_spell_id,
      attempts: data.attempts,
      userId: session?.user.id,
      created_date: new Date(),
    },
  });

  return NextResponse.json(game);
}
