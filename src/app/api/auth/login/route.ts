import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Wrong email or password' }, { status: 400 });
        }


        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET är inte definierad i miljövariabler');
        }

        // Skapa JWT-token
        const token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Returnera token och användarinformation
        return NextResponse.json({ token, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}
