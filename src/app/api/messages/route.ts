import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, NotificationType } from "@prisma/client";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        // hämta info från request body
        const { senderId, receiverId, content } = await req.json();

        if (!senderId || !receiverId || !content) {
            return NextResponse.json({ error: "Sender ID, Receiver ID and Content is required" }, { status: 400 });
        }

        //skapa meddelande
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                receiverId,
                content,
            },
        });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        console.error("Error creating message:", error);
        return NextResponse.json({ error: "Error creating message" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        // hämta relevanta users från query params
        const { searchParams } = new URL(req.url);
        const userId1 = searchParams.get('userId1');
        const userId2 = searchParams.get('userId2');

        if (!userId1 || !userId2) {
            return NextResponse.json({ error: "Both userId1 and userId2 are required" }, { status: 400 });
        }

        //hämta meddelanden där antingen userId1 är avsändare och userId2 mottagare, eller tvärt om
        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 },
                ],
            },
            orderBy: { timestamp: 'asc' },
            include: {
                sender: { select: { id: true, name: true } },
                receiver: { select: { id: true, name: true } },
            },
        });

        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
