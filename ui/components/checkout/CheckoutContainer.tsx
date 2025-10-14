'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Address } from '@/prisma/generated';
import { AddressForm, AddressFormData } from './AddressForm';
import { saveAddress, deleteAddressAction, placeOrder } from '@/app/checkout/actions/checkoutActions';
import { CheckoutData } from '@/services/checkout/checkoutService';
import { QuoteItemWithProduct } from '@/repository/quoteRepository';
import AddressSelector from './AddressSelector';
import CheckoutSummary from './CheckoutSummary';

interface CheckoutContainerProps {
  checkout: CheckoutData;
}

export default function CheckoutContainer({ checkout }: CheckoutContainerProps) {
  const router = useRouter();
  const addresses: Address[] = checkout.addresses;
  const defaultAddress = addresses.find(addr => addr.isDefault);
  const items: QuoteItemWithProduct[] = checkout.cart.quoteItems;
  
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<number | undefined>(
    defaultAddress?.id
  );
  const [selectedBillingAddressId, setSelectedBillingAddressId] = useState<number | undefined>(undefined);
  const [useSameAsShipping, setUseSameAsShipping] = useState(true);
  const [uiMode, setUiMode] = useState<'selecting' | 'editing' | 'adding'>('selecting');
  const [editingAddressId, setEditingAddressId] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const selectedShippingAddress = addresses.find(addr => addr.id === selectedShippingAddressId);
  const selectedBillingAddress = addresses.find(addr => addr.id === selectedBillingAddressId);
  const editingAddress = addresses.find(addr => addr.id === editingAddressId);

  const handleSelectAddress = (addressId: number) => {
    setSelectedShippingAddressId(addressId);

    if (useSameAsShipping) {
      setSelectedBillingAddressId(addressId);
    }
  };

  const handleSaveAddress = async (addressData: AddressFormData) => {
    const addressDataWithId = editingAddressId ? { ...addressData, id: editingAddressId } : addressData;
    const result = await saveAddress(addressDataWithId);

    if (result.success) {
      router.refresh();
      setUiMode('selecting');
      setEditingAddressId(undefined);
    } else {
      alert('Failed to save address: ' + result.error);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    const result = await deleteAddressAction(addressId);
    
    if (result.success) {
      router.refresh();

      if (selectedShippingAddressId === addressId) {
        setSelectedShippingAddressId(undefined);
      }

      if (selectedBillingAddressId === addressId) {
        setSelectedBillingAddressId(undefined);
      }
    } else {
      alert('Failed to delete address: ' + result.error);
    }
  };

  const handleEditAddress = (addressId: number) => {
    setEditingAddressId(addressId);
    setUiMode('editing');
  };

  const handleAddNewAddress = () => {
    setEditingAddressId(undefined);
    setUiMode('adding');
  };

  const handleCancelForm = () => {
    setUiMode('selecting');
    setEditingAddressId(undefined);
  };

  const handleProceedToPayment = async () => {
    if (!selectedShippingAddressId || (!selectedBillingAddressId && !useSameAsShipping)) {
      alert('Please select shipping and billing addresses');
      return;
    }

    const billingAddressId = useSameAsShipping ? selectedShippingAddressId : selectedBillingAddressId!;
    setIsLoading(true);

    await placeOrder(selectedShippingAddressId, billingAddressId);
  };

  return (
    <div className="space-y-8">
      <AddressSelector
        addresses={addresses}
        selectedAddressId={selectedShippingAddressId}
        onSelectAddress={handleSelectAddress}
        onEditAddress={handleEditAddress}
        onDeleteAddress={handleDeleteAddress}
        onAddNew={handleAddNewAddress}
        disabled={isLoading}
      />

      {(uiMode === 'editing' || uiMode === 'adding') && (
        <AddressForm
          title={uiMode === 'editing' ? 'Edit Address' : 'Add New Address'}
          initialData={editingAddress}
          onSubmit={handleSaveAddress}
          onCancel={handleCancelForm}
          showDefaultCheckbox={true}
          disabled={isLoading}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>
            {selectedShippingAddress ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {selectedShippingAddress.firstName} {selectedShippingAddress.lastName}
                    </h4>
                    {selectedShippingAddress.company && (
                      <p className="text-sm text-gray-600">{selectedShippingAddress.company}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      {selectedShippingAddress.street1}
                      {selectedShippingAddress.street2 && <>, {selectedShippingAddress.street2}</>}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedShippingAddress.city}, {selectedShippingAddress.state} {selectedShippingAddress.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{selectedShippingAddress.country}</p>
                    <p className="text-sm text-gray-600">{selectedShippingAddress.phone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEditAddress(selectedShippingAddress.id)}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                    disabled={isLoading}
                  >
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-gray-500">Please select a shipping address above.</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Address</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  checked={useSameAsShipping}
                  onChange={(e) => setUseSameAsShipping(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label htmlFor="sameAsShipping" className="ml-2 block text-sm text-gray-900">
                  Same as shipping address
                </label>
              </div>
              
              {useSameAsShipping ? (
                selectedShippingAddress ? (
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-gray-900">
                      {selectedShippingAddress.firstName} {selectedShippingAddress.lastName}
                    </h4>
                    {selectedShippingAddress.company && (
                      <p className="text-sm text-gray-600">{selectedShippingAddress.company}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      {selectedShippingAddress.street1}
                      {selectedShippingAddress.street2 && <>, {selectedShippingAddress.street2}</>}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedShippingAddress.city}, {selectedShippingAddress.state} {selectedShippingAddress.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{selectedShippingAddress.country}</p>
                    <p className="text-sm text-gray-600">{selectedShippingAddress.phone}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">Please select a shipping address first.</p>
                )
              ) : (
                selectedBillingAddress ? (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {selectedBillingAddress.firstName} {selectedBillingAddress.lastName}
                      </h4>
                      {selectedBillingAddress.company && (
                        <p className="text-sm text-gray-600">{selectedBillingAddress.company}</p>
                      )}
                      <p className="text-sm text-gray-600">
                        {selectedBillingAddress.street1}
                        {selectedBillingAddress.street2 && <>, {selectedBillingAddress.street2}</>}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedBillingAddress.city}, {selectedBillingAddress.state} {selectedBillingAddress.postalCode}
                      </p>
                      <p className="text-sm text-gray-600">{selectedBillingAddress.country}</p>
                      <p className="text-sm text-gray-600">{selectedBillingAddress.phone}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleEditAddress(selectedBillingAddress.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-500"
                      disabled={isLoading}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">Please select a billing address above.</p>
                )
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <CheckoutSummary 
            items={items}
            onProceedToPayment={handleProceedToPayment}
            disabled={!selectedShippingAddressId || (!selectedBillingAddressId && !useSameAsShipping) || isLoading}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
