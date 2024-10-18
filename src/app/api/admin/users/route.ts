import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Hämta alla användare och välj specifika fält
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                isAdmin: true,
            },
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch users", error);
        return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
    }
}

export const config = {
    runtime: 'nodejs', // Om det behövs för server-miljöer
};
