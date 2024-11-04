import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, BookingStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { bookingId }: { bookingId: string } = await req.json();

        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: BookingStatus.DECLINED },
        });

        return NextResponse.json({ message: "Booking declined", booking }, { status: 200 });
    } catch (error) {
        console.error("Error declining booking:", error);
        return NextResponse.json({ error: "Error declining booking" }, { status: 500 });
    }
}
