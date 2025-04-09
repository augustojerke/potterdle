import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest, { params }) {
  const session = await getServerSession(authOptions);
  const challenges = await prisma.challenge.findMany({
    where: {
      challenger_user_id: session?.user.id,
    },
  });

  return NextResponse.json(challenges);
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
  const challenge = await prisma.challenge.create({
    data: {
      challenger_user_id: session?.user.id,
      challenged_user_id: data.challenged_user_id,
      game_id: data.game_id,
      winner_user_id: null,
    },
  });

  return NextResponse.json(challenge);
}
