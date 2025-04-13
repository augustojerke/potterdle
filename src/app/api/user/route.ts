import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
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

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: session.user.id,
        },
      },
      select: {
        id: true,
        username: true,
        points: true,
      },
    });

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erro ao buscar usuários." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data: User = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "This email is already using", success: false },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        house: data.house,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Network Error", success: false },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json(
      { message: "Usuário não autenticado." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { name, house } = body;

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
        house,
      },
    });

    return NextResponse.json(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar o usuário", success: false },
      { status: 500 }
    );
  }
}
