import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb"; // För att konvertera till ObjectId

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { bookingId: string } }) {
    const { bookingId } = params;

    try {
        // Hämta och verifiera token från headers
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json({ error: "Authorization token missing" }, { status: 401 });
        }

        // Dekodera token och hämta userId
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const userId = decodedToken.userId;
        console.log("Decoded userId from token:", userId);

        // Kontrollera att `bookingId` är giltig och bokningen existerar
        if (!ObjectId.isValid(bookingId)) {
            return NextResponse.json({ error: "Invalid booking ID format" }, { status: 400 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { property: true }, // Inkludera egendomen för att få tillgång till `property.userId`
        });

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        console.log("Booking's userId:", booking.userId);
        console.log("Property's userId (owner):", booking.property.userId);

        // Kontrollera om användaren är auktoriserad: bokningsskapare eller egendomens ägare
        if (booking.userId !== userId && booking.property.userId !== userId) {
            console.log("User not authorized to delete this booking");
            return NextResponse.json({ error: "User not authorized to delete this booking" }, { status: 403 });
        }

        // Radera bokningen
        await prisma.booking.delete({
            where: { id: bookingId },
        });

        return NextResponse.json({ message: "Booking deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting booking:", error);
        return NextResponse.json({ error: "Error deleting booking" }, { status: 500 });
    }
}
