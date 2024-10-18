import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
    const authorizationHeader = req.headers.get('authorization');

    if (!authorizationHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = decodedToken.userId; // Justera om du använder 'UserId' istället

        // Radera användaren från databasen baserat på userId
        await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        return NextResponse.json({ message: 'User deleted' }, { status: 200 });
    } catch (error) {
        console.error('Failed to delete user', error);
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}

export const config = {
    runtime: 'nodejs', // Om det behövs för server-miljöer
};
