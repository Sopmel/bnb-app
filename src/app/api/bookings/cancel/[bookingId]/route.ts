import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, BookingStatus } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { bookingId: string } }) {
    // Hämta bookingId från params
    const { bookingId } = params;

    try {
        //separerar token från headers och verifierar token
        const token = req.headers.get("Authorization")?.split(" ")[1];

        //dekodar token och hämtar userId
        const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET!) : null;
        const userId = decodedToken ? (decodedToken as { userId: string }).userId : null;

        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }


        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking || booking.userId !== userId) {
            return NextResponse.json({ error: "Booking not found or user not authorized" }, { status: 404 });
        }

        // Uppdatera status 
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: BookingStatus.CANCELLED },
        });

        return NextResponse.json({ message: "Booking cancelled", booking: updatedBooking }, { status: 200 });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return NextResponse.json({ error: "Error cancelling booking" }, { status: 500 });
    }
}
