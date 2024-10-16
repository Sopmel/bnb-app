import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { name, email, password, isAdmin } = await req.json();

        // Kontrollera om användaren redan finns
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hasha lösenordet
        const hashedPassword = await bcrypt.hash(password, 10);

        // Skapa ny användare
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isAdmin: isAdmin || false,
            },
        });

        return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred', error }, { status: 500 });
    }
}
