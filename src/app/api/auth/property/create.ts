import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, description, location, pricePerNight, availability } = req.body;

        const property = await prisma.property.create({
            data: {
                name,
                description,
                location,
                pricePerNight,
                availability,
            },
        });

        res.status(201).json({ property });
    } else {
        res.status(405).json({ message: 'Endast POST är tillåten' });
    }
}
