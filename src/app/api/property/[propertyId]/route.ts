import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { propertyId: string } }) {
    try {
        const data = await req.json();
        const updatedProperty = await prisma.property.update({
            where: { id: params.propertyId },
            data: {
                name: data.name,
                description: data.description,
                location: data.location,
                pricePerNight: data.pricePerNight,
                availability: data.availability,
            },
        });

        return NextResponse.json(updatedProperty, { status: 200 });
    } catch (error) {
        console.error("Error updating property:", error);
        return NextResponse.json({ error: "Error updating property" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { propertyId: string } }) {
    try {
        await prisma.property.delete({
            where: { id: params.propertyId },
        });

        return NextResponse.json({ message: 'Property deleted' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting property:', error);
        return NextResponse.json({ error: 'Error deleting property' }, { status: 500 });
    }
}