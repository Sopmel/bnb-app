import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
            const userId = decodedToken.UserId;

            await prisma.user.delete({
                where: {
                    id: userId
                }
            });

            return res.status(200).json({ message: 'User deleted' });
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}