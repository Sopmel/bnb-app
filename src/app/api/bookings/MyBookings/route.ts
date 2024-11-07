import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        // Hämta token från headers
        const token = req.headers.get("Authorization")?.split(" ")[1];

        const decodedToken = token ? jwt.verify(token, process.env.JWT_SECRET!) : null;
        const userId = decodedToken ? (decodedToken as { userId: string }).userId : null;

        if (!userId) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        // Hämta bokningar där användaren är gästen
        const userBookings = await prisma.booking.findMany({
            where: {
                userId: userId,
                status: "APPROVED",
            },
            include: {
                property: {
                    select: {
                        name: true,
                        location: true,
                        imageUrl: true,
                        pricePerNight: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json(userBookings, { status: 200 });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        return NextResponse.json({ error: "Error fetching user bookings" }, { status: 500 });
    }
}

export const runtime = "nodejs";
