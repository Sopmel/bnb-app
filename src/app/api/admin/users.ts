import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {

            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    isAdmin: true,
                },
            });


            return res.status(200).json(users);
        } catch (error) {
            console.error("Failed to fetch users", error);
            return res.status(500).json({ message: "Failed to fetch users" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
