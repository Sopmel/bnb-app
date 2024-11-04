import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;
        const messages = await prisma.message.findMany({
            where: { senderId: userId },
            include: { receiver: true },  // Inkludera mottagarens info
        });

        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch sent messages:", error);
        return NextResponse.json({ error: "Failed to fetch sent messages" }, { status: 500 });
    }
}
