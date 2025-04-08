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
      select: {
        id: true,
        username: true,
        points: true,
      },
    });

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch {}
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
