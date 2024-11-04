// /api/bookings/bookedProperties.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET!) : null;
        const userId = decodedToken ? (decodedToken as { userId: string }).userId : null;

        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        const bookedProperties = await prisma.booking.findMany({
            where: {
                property: {
                    userId: userId
                },
                status: "APPROVED",
            },
            include: {
                property: true,
            }
        });

        return NextResponse.json(bookedProperties, { status: 200 });
    } catch (error) {
        console.error("Error fetching booked properties:", error);
        return NextResponse.json({ error: "Error fetching booked properties" }, { status: 500 });
    }
}

export const runtime = "nodejs";
