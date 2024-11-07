import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        //separera nödvändig info från request body
        const { checkInDate, checkOutDate, userId, propertyId } = req.body;

        // Gör till date-obj, Beräkna antalet nätter
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);

        // hitta property med id, räkna ut pris
        const property = await prisma.property.findUnique({
            where: { id: propertyId },
        });

        if (!property) {
            return res.status(404).json({ message: 'Egendom hittades inte' });
        }

        const totalPrice = nights * property.pricePerNight;

        // Skapa ny bokning
        const booking = await prisma.booking.create({
            data: {
                checkInDate: checkIn,
                checkOutDate: checkOut,
                totalPrice,
                user: { connect: { id: userId } },
                property: { connect: { id: propertyId } },
            },
        });

        res.status(201).json({ booking });
    } else {
        res.status(405).json({ message: 'Endast POST är tillåten' });
    }
}
