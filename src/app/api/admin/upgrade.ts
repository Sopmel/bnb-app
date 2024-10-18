import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId } = req.body;

        try {
            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    isAdmin: true
                },
            });

            return res.status(200).json({ message: 'User upgraded to admin' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to upgrade user' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}