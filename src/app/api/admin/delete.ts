import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { userId } = req.query;

        try {
            await prisma.user.delete({
                where: {
                    id: String(userId)
                },
            });

            return res.status(200).json({ message: 'User deleted' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete user' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}