import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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

    const history = await prisma.history.findMany({
      where: {
        user_id: session.user.id,
      },
    });

    return NextResponse.json({ success: true, history }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao buscar usuários." },
      { status: 500 }
    );
  }
}
