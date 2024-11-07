import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { bookingId: string } }) {
    const { bookingId } = params;
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const userId = decodedToken.userId;

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                property: { include: { user: true } }, // Inkludera användaren som äger fastigheten
            },
        });

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json(booking, { status: 200 });
    } catch (error) {
        console.error("Error fetching booking:", error);
        return NextResponse.json({ error: "Error fetching booking" }, { status: 500 });
    }
}

export const runtime = "nodejs";
