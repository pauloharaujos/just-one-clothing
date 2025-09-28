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

export async function getCustomerByEmail(email: string): Promise<User | null> {
    try {
        const data = await prisma.user.findUnique({
            where: { email }
        });

        return data;
    } catch (err) {
        console.log(`Error while loading customer by email ${err}`);
        throw new Error(`Error while loading customer by email ${err}`);
    }
}

export async function updateCustomerInfo(
    email: string,
    data: { 
        name?: string; 
        cpf?: string; 
        phone?: string; 
        age?: number 
    }
): Promise<boolean> {
    try {
        await prisma.user.update({
            where: { email: email },
            data,
        });

        return true;
    } catch (err) {
        console.log(`Error while updating customer info: ${err}`);
        throw new Error(`Error while updating customer info: ${err}`);
    }
}