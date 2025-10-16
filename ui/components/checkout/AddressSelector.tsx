'use client';

import { Address } from '@/prisma/generated';

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId?: number;
  onSelectAddress: (addressId: number) => void;
  onEditAddress: (addressId: number) => void;
  onDeleteAddress: (addressId: number) => void;
  onAddNew: () => void;
  disabled?: boolean;
}

export default function AddressSelector({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onEditAddress,
  onDeleteAddress,
  onAddNew,
  disabled = false
}: AddressSelectorProps) {
  const handleDelete = (addressId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this address?')) {
      onDeleteAddress(addressId);
    }
  };

  const handleEdit = (addressId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onEditAddress(addressId);
  };

  const handleSelect = (addressId: number) => {
    if (!disabled) {
      onSelectAddress(addressId);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Addresses</h2>
        <button
          type="button"
          onClick={onAddNew}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          + Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No addresses</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first address.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={onAddNew}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={disabled}
            >
              Add Your First Address
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedAddressId === address.id
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                  : 'border-gray-200 hover:border-gray-300'
              } ${disabled ? 'cursor-not-allowed opacity-75' : ''}`}
              onClick={() => handleSelect(address.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-gray-900 truncate">
                      {address.firstName} {address.lastName}
                    </h4>
                    {address.isDefault && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                        Default
                      </span>
                    )}
                  </div>
                  
                  {address.company && (
                    <p className="text-sm text-gray-600 mb-1 truncate">{address.company}</p>
                  )}
                  
                  <p className="text-sm text-gray-600 mb-1">
                    {address.street1}
                    {address.street2 && <>, {address.street2}</>}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">{address.country}</p>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={(e) => handleSelect(address.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={disabled}
                >
                  Use This Address
                </button>
                
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={(e) => handleEdit(address.id, e)}
                    className="text-sm text-indigo-600 hover:text-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={disabled}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(address.id, e)}
                    className="text-sm text-red-600 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={disabled}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
