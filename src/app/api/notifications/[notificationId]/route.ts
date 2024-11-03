import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: { params: { notificationId: string } }) {
    const { notificationId } = params;

    if (!notificationId) {
        console.error("Notification ID is missing");
        return NextResponse.json({ error: "Notification ID is missing" }, { status: 400 });
    }

    try {
        const updatedNotification = await prisma.notification.update({
            where: { id: notificationId },
            data: { read: true },
        });

        return NextResponse.json(updatedNotification, { status: 200 });
    } catch (error) {
        console.error('Error updating notification', error);
        return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { notificationId: string } }) {
    const { notificationId } = params;

    if (!notificationId) {
        console.error("Notification ID is missing for delete operation");
        return NextResponse.json({ error: "Notification ID is missing" }, { status: 400 });
    }

    try {
        await prisma.notification.delete({
            where: { id: notificationId },
        });

        return NextResponse.json({ message: "Notification deleted" }, { status: 200 });
    } catch (error) {
        console.error('Error deleting notification', error);
        return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 });
    }
}