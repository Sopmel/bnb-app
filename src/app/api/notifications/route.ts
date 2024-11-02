import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, NotificationType } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { userId, message, type, bookingId, messageId }:
            { userId: string; message: string; type: NotificationType; bookingId?: string; messageId?: string } = await req.json();

        const notificationData = {
            userId,
            message,
            type,
            read: false,
            ...(bookingId && { bookingId }),
            ...(messageId && { messageId })
        };

        const notification = await prisma.notification.create({
            data: notificationData,
        });

        return NextResponse.json(notification, { status: 201 });
    } catch (error) {
        console.error('Error creating notification', error);
        return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
    }
}



export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET!) : null;
        const userId = decodedToken ? (decodedToken as { userId: string }).userId : null;

        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        const notifications = await prisma.notification.findMany({
            where: { userId },
            include: {
                booking: {
                    select: { id: true, property: { select: { name: true } } },
                },
                messageRef: {
                    select: { id: true, content: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(notifications, { status: 200 });
    } catch (error) {
        console.error("Error fetching notifications", error);
        return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
    }
}
