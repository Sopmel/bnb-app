import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { messageId: string } }) {
    try {
        const { messageId } = params;

        await prisma.message.delete({
            where: { id: messageId },
        });

        return NextResponse.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Failed to delete message:', error);
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
}
