import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params;

        if (!userId) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const { action } = await req.json();

        if (action !== 'downgrade' && action !== 'upgrade') {
            return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }

        // Uppdatera användarens isAdmin-status baserat på action
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isAdmin: action === 'upgrade', // True om upgrade, annars false
            },
        });

        const message = action === 'upgrade' ? 'User upgraded to Admin' : 'User downgraded to regular user';
        return NextResponse.json({ message }, { status: 200 });
    } catch (error) {
        console.error('Failed to toggle user admin status', error);
        return NextResponse.json({ message: 'Failed to toggle user admin status' }, { status: 500 });
    }
}

export const config = {
    runtime: 'nodejs',
};
