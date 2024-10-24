import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        if (!data.userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const newProperty = await prisma.property.create({
            data: {
                name: data.name,
                description: data.description,
                location: data.location,
                pricePerNight: parseFloat(data.pricePerNight),
                availability: data.availability ?? true,
                user: {
                    connect: { id: data.userId },  // Koppla egendomen till användaren
                },
            },
        });
        return NextResponse.json(newProperty, { status: 201 });
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json({ error: 'Error creating property' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        // Dynamiskt sätta 'where'-filtret baserat på om userId finns
        const properties = await prisma.property.findMany({
            where: userId ? { userId: userId } : {},  // Om userId finns, inkludera det i 'where'
        });

        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ error: 'Error fetching properties' }, { status: 500 });
    }
}

