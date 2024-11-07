import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, BookingStatus } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        // nödvändig data från request body
        const { propertyId, startDate, endDate }: { propertyId: string; startDate: string; endDate: string } = await req.json();

        // Hämta data om egendom och ägaren (userId)
        const property = await prisma.property.findUnique({
            where: { id: propertyId },
            select: { userId: true, pricePerNight: true },
        });

        if (!property) {
            return NextResponse.json({ error: "Property not found" }, { status: 404 });
        }


        const nights = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
        const cost = nights * property.pricePerNight;

        const token = req.headers.get("Authorization")?.split(" ")[1];

        const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET!) : null;
        const userId = decodedToken ? (decodedToken as { userId: string }).userId : null;

        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        // Skapa bokning
        const booking = await prisma.booking.create({
            data: {
                propertyId,
                checkInDate: new Date(startDate),
                checkOutDate: new Date(endDate),
                totalPrice: cost,
                userId,
                status: BookingStatus.PENDING,
            },
        });

        //skickar bookningsid ownerid och kostnad tillbaka
        return NextResponse.json({ cost, bookingId: booking.id, ownerId: property.userId }, { status: 201 });
    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({ error: "Error creating booking" }, { status: 500 });
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

        // Hämta bokningar där status är 'PENDING' och som tillhör användaren
        const pendingRequests = await prisma.booking.findMany({
            where: {
                property: {
                    userId: userId
                },
                status: BookingStatus.PENDING,
            },
            include: {
                user: true,
            }
        });

        return NextResponse.json(pendingRequests, { status: 200 });
    } catch (error) {
        console.error("Error fetching booking requests:", error);
        return NextResponse.json({ error: "Error fetching booking requests" }, { status: 500 });
    }
}