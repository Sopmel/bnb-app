import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newProperty = await prisma.property.create({
            data: {
                name: data.name,
                description: data.description,
                location: data.location,
                pricePerNight: parseFloat(data.pricePerNight),
                availability: data.availability ?? true,
            },
        });
        return NextResponse.json(newProperty, { status: 201 });
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json({ error: 'Error creating property' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const properties = await prisma.property.findMany();
        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ error: 'Error fetching properties' }, { status: 500 });
    }
}
