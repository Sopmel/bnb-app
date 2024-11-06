import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get("search");
        const destinationType = url.searchParams.get("destinationType");
        const propertyType = url.searchParams.get("propertyType");

        const properties = await prisma.property.findMany({
            where: {
                ...(search
                    ? {
                        OR: [
                            { name: { contains: search, mode: "insensitive" } },
                            { description: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {}),
                ...(destinationType ? { destinationType: destinationType as any } : {}),
                ...(propertyType ? { propertyType: propertyType as any } : {}),
            },
            include: {
                user: { select: { name: true } },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
    }
}
