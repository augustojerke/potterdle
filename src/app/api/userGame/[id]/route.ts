import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }) {
  await prisma.userGame.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({
    message: "UserGame deletado",
  });
}
