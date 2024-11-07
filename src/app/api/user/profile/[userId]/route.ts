import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
// userid i url, params
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    const authorizationHeader = req.headers.get('authorization');

    // Kontrollera auth finns i header
    if (!authorizationHeader) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    // tar ut token från headern
    const token = authorizationHeader.split(' ')[1];

    try {
        // Verifiera JWT-token
        jwt.verify(token, process.env.JWT_SECRET!);


        const { userId } = params;
        if (!userId || userId === 'null') {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        // Hämta användarens profil baserat på userId
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

        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        } else if (error instanceof jwt.TokenExpiredError) {
            return NextResponse.json({ message: 'Token expired' }, { status: 401 });
        }

        console.error('Failed to fetch user', error);
        return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
    }
}

export const runtime = "nodejs";
