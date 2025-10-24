import { describe, it, expect, jest, beforeEach } from '@jest/globals';

jest.mock('@/repository/quoteRepository');
jest.mock('@/repository/orderRepository');
jest.mock('@/repository/orderPaymentRepository');
jest.mock('@/services/cart/cartService');
jest.mock('@/services/address/addressService');
jest.mock('@/services/stripe/stripeService');
jest.mock('next/headers');
jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

import { placeOrderService } from '../checkoutService';
import * as cartService from '@/services/cart/cartService';
import * as addressService from '@/services/address/addressService';
import * as orderRepository from '@/repository/orderRepository';
import * as orderPaymentRepository from '@/repository/orderPaymentRepository';
import * as stripeService from '@/services/stripe/stripeService';
import * as quoteRepository from '@/repository/quoteRepository';
import { headers } from 'next/headers';

const mockCartService = cartService as jest.Mocked<typeof cartService>;
const mockAddressService = addressService as jest.Mocked<typeof addressService>;
const mockOrderRepository = orderRepository as jest.Mocked<typeof orderRepository>;
const mockOrderPaymentRepository = orderPaymentRepository as jest.Mocked<typeof orderPaymentRepository>;
const mockStripeService = stripeService as jest.Mocked<typeof stripeService>;
const mockQuoteRepository = quoteRepository as jest.Mocked<typeof quoteRepository>;
const mockHeaders = headers as jest.MockedFunction<typeof headers>;

describe('placeOrderService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully place an order and return Stripe checkout URL', async () => {
    const customerId = 'customer-123';
    const customerEmail = 'test@example.com';
    const shippingAddressId = 1;
    const billingAddressId = 2;

    const mockCart = {
      id: 1,
      userId: customerId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      quoteItems: [
        {
          id: 1,
          quoteId: 1,
          productId: 1,
          quantity: 2,
          price: 29.99,
          createdAt: new Date(),
          updatedAt: new Date(),
          product: {
            id: 1,
            name: 'Test Product',
            sku: 'TEST-001',
            url: 'test-product',
            description: 'A test product',
            price: 29.99,
            visible: true,
          },
        },
        {
          id: 2,
          quoteId: 1,
          productId: 2,
          quantity: 1,
          price: 19.99,
          createdAt: new Date(),
          updatedAt: new Date(),
          product: {
            id: 2,
            name: 'Another Product',
            sku: 'TEST-002',
            url: 'another-product',
            description: 'Another test product',
            price: 19.99,
            visible: true,
          },
        },
      ],
    };

    const mockAddresses = [
      {
        id: 1,
        userId: customerId,
        firstName: 'John',
        lastName: 'Doe',
        company: null,
        street1: '123 Main St',
        street2: null,
        city: 'Anytown',
        state: 'CA',
        postalCode: '12345',
        country: 'US',
        phone: '555-1234',
        isDefault: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: customerId,
        firstName: 'John',
        lastName: 'Doe',
        company: null,
        street1: '456 Oak Ave',
        street2: null,
        city: 'Anytown',
        state: 'CA',
        postalCode: '12345',
        country: 'US',
        phone: '555-1234',
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockOrderNumber = 'ORD-TEST-1234';
    const mockOrder = {
      id: 1,
      orderNumber: mockOrderNumber,
      userId: customerId,
      billingAddressId: 2,
      shippingAddressId: 1,
      subtotal: 79.97,
      tax: 6.40,
      total: 86.37,
      status: 'PENDING' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderItems: [
        {
          id: 1,
          orderId: 1,
          productId: 1,
          quantity: 2,
          price: 29.99,
          name: 'Test Product',
          sku: 'TEST-001',
          createdAt: new Date(),
          product: mockCart.quoteItems[0].product,
        },
        {
          id: 2,
          orderId: 1,
          productId: 2,
          quantity: 1,
          price: 19.99,
          name: 'Another Product',
          sku: 'TEST-002',
          createdAt: new Date(),
          product: mockCart.quoteItems[1].product,
        },
      ],
      billingAddress: mockAddresses[1],
      shippingAddress: mockAddresses[0],
      user: {
        id: customerId,
        email: customerEmail,
        name: 'John Doe',
        emailVerified: null,
        image: null,
        password: null,
        cpf: null,
        phone: null,
        age: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    const mockStripeCheckoutUrl = 'https://checkout.stripe.com/pay/cs_test_123';
    mockCartService.getCart.mockResolvedValue(mockCart);
    mockAddressService.getAddressesByUserId.mockResolvedValue(mockAddresses);
    mockOrderRepository.generateOrderNumber.mockResolvedValue(mockOrderNumber);
    mockOrderRepository.createOrder.mockResolvedValue(mockOrder);
    mockOrderPaymentRepository.createOrderPayment.mockResolvedValue({} as any);
    mockStripeService.createCheckoutSession.mockResolvedValue({
      sessionId: 'cs_test_123',
      url: mockStripeCheckoutUrl,
    });
    mockOrderPaymentRepository.updateOrderPayment.mockResolvedValue({} as any);
    mockQuoteRepository.deactivateUserCart.mockResolvedValue(undefined);
    mockHeaders.mockResolvedValue({
      get: jest.fn().mockReturnValue('localhost:3000'),
    } as any);

    const result = await placeOrderService(
      customerId,
      customerEmail,
      shippingAddressId,
      billingAddressId
    );

    expect(result).toBe(mockStripeCheckoutUrl);
    expect(mockCartService.getCart).toHaveBeenCalledTimes(1);
    expect(mockAddressService.getAddressesByUserId).toHaveBeenCalledWith(customerId);

    const expectedSubtotal = 79.97;
    const expectedTax = expectedSubtotal * 0.08;
    const expectedTotal = expectedSubtotal + expectedTax;

    expect(mockOrderRepository.createOrder).toHaveBeenCalledWith({
      orderNumber: mockOrderNumber,
      user: { connect: { id: customerId } },
      billingAddress: { connect: { id: billingAddressId } },
      shippingAddress: { connect: { id: shippingAddressId } },
      subtotal: expectedSubtotal,
      tax: expectedTax,
      total: expectedTotal,
      status: 'PENDING',
      orderItems: {
        create: [
          {
            product: { connect: { id: 1 } },
            quantity: 2,
            price: 29.99,
            name: 'Test Product',
            sku: 'TEST-001',
          },
          {
            product: { connect: { id: 2 } },
            quantity: 1,
            price: 19.99,
            name: 'Another Product',
            sku: 'TEST-002',
          },
        ],
      },
    });

    expect(mockOrderPaymentRepository.createOrderPayment).toHaveBeenCalledWith({
      orderId: mockOrder.id,
      amount: expectedTotal,
      currency: 'usd',
    });
    expect(mockStripeService.createCheckoutSession).toHaveBeenCalledWith({
      orderId: mockOrder.id,
      orderNumber: mockOrderNumber,
      items: [
        {
          name: 'Test Product',
          quantity: 2,
          price: 29.99,
        },
        {
          name: 'Another Product',
          quantity: 1,
          price: 19.99,
        },
      ],
      total: expectedTotal,
      customerEmail,
      baseUrl: 'http://localhost:3000',
    });

    expect(mockOrderPaymentRepository.updateOrderPayment).toHaveBeenCalledWith(
      mockOrder.id,
      {
        stripeSessionId: 'cs_test_123',
      }
    );

    expect(mockQuoteRepository.deactivateUserCart).toHaveBeenCalledWith(mockCart.id);
  });
});
