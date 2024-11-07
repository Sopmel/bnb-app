import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;

        //hämtar meddelanden där användarens
        // userId matchar receiverId
        const messages = await prisma.message.findMany({
            where: { receiverId: userId },
            include: { sender: true },
        });

        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch received messages:", error);
        return NextResponse.json({ error: "Failed to fetch received messages" }, { status: 500 });
    }
}
