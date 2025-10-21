/**
 * OrderPayment Repository
 * Handles database operations for OrderPayment model
 */

import { 
  PaymentStatus,
  OrderStatus,
  Order 
} from '@/prisma/generated';
import prisma from '@/prisma/prismaClient';

export interface CreateOrderPaymentData {
  orderId: number;
  amount: number;
  currency?: string;
}

export interface UpdateOrderPaymentData {
  stripeSessionId?: string;
  stripePaymentIntent?: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: string;
}

/**
 * Creates a new OrderPayment record
 */
export async function createOrderPayment(data: CreateOrderPaymentData) {
  return await prisma.orderPayment.create({
    data: {
      orderId: data.orderId,
      amount: data.amount,
      currency: data.currency || 'usd',
      paymentStatus: 'PENDING',
    },
  });
}

/**
 * Updates an existing OrderPayment record
 */
export async function updateOrderPayment(
  orderId: number,
  data: UpdateOrderPaymentData
) {
  return await prisma.orderPayment.update({
    where: { orderId },
    data,
  });
}

/**
 * Finds an OrderPayment by Stripe session ID
 */
export async function getOrderPaymentBySessionId(stripeSessionId: string) {
  return await prisma.orderPayment.findUnique({
    where: { stripeSessionId },
    include: {
      order: {
        include: {
          user: true,
          orderItems: true,
        },
      },
    },
  });
}

/**
 * Gets OrderPayment by order ID
 */
export async function getOrderPaymentByOrderId(orderId: number) {
  return await prisma.orderPayment.findUnique({
    where: { orderId },
    include: {
      order: {
        include: {
          user: true,
          orderItems: true,
        },
      },
    },
  });
}

/**
 * Updates the status of an Order
 */
export async function updateOrderStatus(
  orderId: number,
  status: OrderStatus
): Promise<Order> {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
}
