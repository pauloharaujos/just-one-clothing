import { Address, Prisma } from '@/prisma/generated';
import prisma from '@/prisma/prismaClient';

type CreateAddressData = Prisma.AddressUncheckedCreateInput;
type AddressUpdateInput = Prisma.AddressUpdateInput;

export type AddressWithUser = Prisma.AddressGetPayload<{
  include: {
    user: true;
  };
}>;

/**
 * Get addresses by user ID
 */
export async function getAddressesByUserId(userId: string): Promise<Address[]> {
  return await prisma.address.findMany({
    where: { userId },
    orderBy: [
      { isDefault: 'desc' },
      { createdAt: 'desc' }
    ]
  });
}

/**
 * Get address by ID and user ID
 */
export async function getAddressById(
  id: number, userId: string): Promise<Address | null> {
  return await prisma.address.findFirst({
    where: { 
      id,
      userId 
    }
  });
}

/**
 * Create a new address
 */
export async function createAddress(
  data: CreateAddressData
): Promise<Address> {
  return await prisma.address.create({
    data
  });
}

/**
 * Update address by ID
 */
export async function updateAddress(
  id: number,
  data: AddressUpdateInput
): Promise<Address> {
  return await prisma.address.update({
    where: { id },
    data
  });
}

/**
 * Update many addresses (for unsetting defaults)
 */
export async function updateManyAddresses(
  where: Prisma.AddressWhereInput,
  data: AddressUpdateInput
): Promise<Prisma.BatchPayload> {
  return await prisma.address.updateMany({
    where,
    data
  });
}

/**
 * Delete address by ID
 */
export async function deleteAddress(id: number): Promise<Address> {
  return await prisma.address.delete({
    where: { id }
  });
}

/**
 * Set address as default by ID
 */
export async function setDefaultAddress(id: number): Promise<Address> {
  return await prisma.address.update({
    where: { id },
    data: { isDefault: true }
  });
}

/**
 * Get default address for user
 */
export async function getDefaultAddress(userId: string): Promise<Address | null> {
  return await prisma.address.findFirst({
    where: { 
      userId,
      isDefault: true 
    }
  });
}
