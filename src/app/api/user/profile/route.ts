import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const authorizationHeader = req.headers.get('authorization');

    if (!authorizationHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authorizationHeader.split(' ')[1];

    try {
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        const userId = decodedToken.userId; // Justera om du använder 'UserId' istället

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        }, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch user', error);
        return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
    }
}

export const config = {
    runtime: 'nodejs',
};
