import prisma from '@/prisma/prismaClient';
import type { Customer } from '@/app/generated/prisma';

export async function getCustomerById(customerId: number): Promise<Customer | null> {
    try {
        const data = await prisma.customer.findUnique({
            where: { id: customerId }
        });

        return data;
    } catch (err) {
        console.log(`Error while loading customer by id ${err}`);
        throw new Error(`Error while loading customer by id ${err}`);
    }
}