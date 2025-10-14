import { Prisma, Address } from '@/prisma/generated';
import * as addressRepository from '@/repository/addressRepository';

export type CreateAddressData = Prisma.AddressUncheckedCreateInput;
export type UpdateAddressData = Prisma.AddressUpdateInput;

/**
 * Get addresses by user ID
 */
export async function getAddressesByUserId(userId: string): Promise<Address[]> {
  return await addressRepository.getAddressesByUserId(userId);
}

/**
 * Create address for a user
 */
export async function saveAddress(
  userId: string,
  addressData: CreateAddressData
): Promise<Address> {
  if (addressData.id) {
    const address = await addressRepository.getAddressById(addressData.id, userId);

    if (!address) {
      throw new Error('Address not found');
    }

    return await addressRepository.updateAddress(addressData.id, addressData);
  }

  return await addressRepository.createAddress({ ...addressData, userId });
}

/**
 * Delete address for a user
 */
export async function deleteAddress(
  addressId: number,
  userId: string
): Promise<Address> {
  const address = await addressRepository.getAddressById(addressId, userId);

  if (!address) {
    throw new Error('Address not found');
  }

  return await addressRepository.deleteAddress(addressId);
}

/**
 * Set address as default for a user
 */
export async function setDefaultAddress(
  addressId: number,
  userId: string
): Promise<Address> {
  const address = await addressRepository.getAddressById(addressId, userId);

  if (!address) {
    throw new Error('Address not found');
  }

  //Unset all other default addresses
  await addressRepository.updateManyAddresses(
    { userId },
    { isDefault: false }
  );

  return await addressRepository.setDefaultAddress(addressId);
}

/**
 * Get default address for a user
 */
export async function getDefaultAddress(userId: string) {
  return await addressRepository.getDefaultAddress(userId);
}
