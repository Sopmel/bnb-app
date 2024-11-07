import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, BookingStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        // hämta bookingId från request body
        const { bookingId }: { bookingId: string } = await req.json();

        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: BookingStatus.APPROVED },
        });

        return NextResponse.json({ message: "Booking approved", booking }, { status: 200 });
    } catch (error) {
        console.error("Error approving booking:", error);
        return NextResponse.json({ error: "Error approving booking" }, { status: 500 });
    }
}
