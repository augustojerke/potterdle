import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Usuário precisa estar autenticado!" },
        { status: 401 }
      );
    }

    const users = await prisma.user.findMany({
      orderBy: {
        points: "desc",
      },
      select: {
        id: true,
        username: true,
        points: true,
      },
    });

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar ranking:", error);
    return NextResponse.json(
      { message: "Erro ao buscar ranking de usuários.", success: false },
      { status: 500 }
    );
  }
}
