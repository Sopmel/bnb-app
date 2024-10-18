import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // Uppdatera användarens isAdmin-status
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isAdmin: true,
            },
        });

        return NextResponse.json({ message: 'User upgraded to admin' }, { status: 200 });
    } catch (error) {
        console.error('Failed to upgrade user', error);
        return NextResponse.json({ message: 'Failed to upgrade user' }, { status: 500 });
    }
}

export const config = {
    runtime: 'nodejs', // Om det behövs för server-miljöer
};
