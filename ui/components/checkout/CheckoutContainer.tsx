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
  const [isAddressSelectorExpanded, setIsAddressSelectorExpanded] = useState(true);
  const [isReviewSectionExpanded, setIsReviewSectionExpanded] = useState(false);

  const selectedShippingAddress = addresses.find(addr => addr.id === selectedShippingAddressId);
  const selectedBillingAddress = addresses.find(addr => addr.id === selectedBillingAddressId);
  const editingAddress = addresses.find(addr => addr.id === editingAddressId);

  const handleSelectAddress = (addressId: number) => {
    setSelectedShippingAddressId(addressId);

    if (useSameAsShipping) {
      setSelectedBillingAddressId(addressId);
    }

    // Auto-transition: collapse address selector and expand review section
    setIsAddressSelectorExpanded(false);
    setIsReviewSectionExpanded(true);
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
    // Return to address selector when canceling form
    setIsAddressSelectorExpanded(true);
    setIsReviewSectionExpanded(false);
  };

  const handleToggleAddressSelector = () => {
    setIsAddressSelectorExpanded(!isAddressSelectorExpanded);
    if (!isAddressSelectorExpanded) {
      setIsReviewSectionExpanded(false);
    }
  };

  const handleToggleReviewSection = () => {
    setIsReviewSectionExpanded(!isReviewSectionExpanded);
    if (!isReviewSectionExpanded) {
      setIsAddressSelectorExpanded(true);
    }
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Addresses Section */}
      <div className="lg:col-span-2 space-y-8">
        {/* Step 1: Your Addresses */}
        <div className="space-y-6">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={handleToggleAddressSelector}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-medium text-sm">
                1
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Select Your Address</h2>
            </div>
            <div className="flex items-center space-x-2">
              {selectedShippingAddressId && (
                <span className="text-sm text-green-600 font-medium">✓ Selected</span>
              )}
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isAddressSelectorExpanded ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {isAddressSelectorExpanded && (
            <div className="transition-all duration-300 ease-in-out">
              <AddressSelector
                addresses={addresses}
                selectedAddressId={selectedShippingAddressId}
                onSelectAddress={handleSelectAddress}
                onEditAddress={handleEditAddress}
                onDeleteAddress={handleDeleteAddress}
                onAddNew={handleAddNewAddress}
                disabled={isLoading}
              />
            </div>
          )}
        </div>

        {/* Address Form (when editing/adding) */}
        {(uiMode === 'editing' || uiMode === 'adding') && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-medium text-sm">
                1.5
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {uiMode === 'editing' ? 'Edit Address' : 'Add New Address'}
              </h2>
            </div>
            <AddressForm
              title=""
              initialData={editingAddress}
              onSubmit={handleSaveAddress}
              onCancel={handleCancelForm}
              showDefaultCheckbox={true}
              disabled={isLoading}
            />
          </div>
        )}

        {/* Step 2: Selected Addresses */}
        <div className="space-y-6">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={handleToggleReviewSection}
          >
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm ${
                selectedShippingAddressId ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
              }`}>
                2
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Review Selected Addresses</h2>
            </div>
            <div className="flex items-center space-x-2">
              {selectedShippingAddressId && (
                <span className="text-sm text-green-600 font-medium">✓ Ready</span>
              )}
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isReviewSectionExpanded ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {isReviewSectionExpanded && (
            <div className="transition-all duration-300 ease-in-out">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Shipping Address Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Shipping Address
                </h3>
              </div>
              <div className="p-6">
                {selectedShippingAddress ? (
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {selectedShippingAddress.firstName} {selectedShippingAddress.lastName}
                        </h4>
                        {selectedShippingAddress.company && (
                          <p className="text-sm text-gray-600 mt-1">{selectedShippingAddress.company}</p>
                        )}
                        <div className="mt-2 space-y-1">
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
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEditAddress(selectedShippingAddress.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                        disabled={isLoading}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-4 text-gray-300">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">No shipping address selected</p>
                    <p className="text-xs text-gray-400 mt-1">Select an address from Step 1</p>
                  </div>
                )}
              </div>
            </div>

            {/* Billing Address Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Billing Address
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
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
                      <div className="p-4 bg-gray-50 rounded-md border">
                        <div className="space-y-1">
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
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-500">Please select a shipping address first</p>
                      </div>
                    )
                  ) : (
                    selectedBillingAddress ? (
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {selectedBillingAddress.firstName} {selectedBillingAddress.lastName}
                            </h4>
                            {selectedBillingAddress.company && (
                              <p className="text-sm text-gray-600 mt-1">{selectedBillingAddress.company}</p>
                            )}
                            <div className="mt-2 space-y-1">
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
                          </div>
                          <button
                            type="button"
                            onClick={() => handleEditAddress(selectedBillingAddress.id)}
                            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                            disabled={isLoading}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-12 h-12 mx-auto mb-4 text-gray-300">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-500">No billing address selected</p>
                        <p className="text-xs text-gray-400 mt-1">Select a different address or use shipping address</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <div className="lg:col-span-1">
        <CheckoutSummary 
          items={items}
          onProceedToPayment={handleProceedToPayment}
          disabled={!selectedShippingAddressId || (!selectedBillingAddressId && !useSameAsShipping) || isLoading}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
