import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }) {
  await prisma.challenge.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json({
    message: "Challenge deletado",
  });
}
