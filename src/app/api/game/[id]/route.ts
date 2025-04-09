import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: any) {
  await prisma.game.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({
    message: "Game deletado",
  });
}
