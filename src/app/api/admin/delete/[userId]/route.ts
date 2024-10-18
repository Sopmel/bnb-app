import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
    const { userId } = params;

    try {
        // Radera användaren baserat på userId
        await prisma.user.delete({
            where: {
                id: String(userId),
            },
        });

        return NextResponse.json({ message: 'User deleted' }, { status: 200 });
    } catch (error) {
        console.error('Failed to delete user', error);
        return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
    }
}
