import prisma from '@/prisma/prismaClient';
import type { User } from '@/app/generated/prisma';

export async function getCustomerById(customerId: string): Promise<User | null> {
    try {
        const data = await prisma.user.findUnique({
            where: { id: customerId }
        });

        return data;
    } catch (err) {
        console.log(`Error while loading customer by id ${err}`);
        throw new Error(`Error while loading customer by id ${err}`);
    }
}