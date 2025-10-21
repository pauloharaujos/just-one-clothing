/**
 * Stripe Service
 * Handles all Stripe-related operations following SOLID principles
 */

import Stripe from 'stripe';
import { stripeConfig } from './stripeConfig';

const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: stripeConfig.apiVersion,
  typescript: true,
});

export interface CheckoutSessionParams {
  orderId: number;
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  customerEmail: string;
  baseUrl: string;
}

/**
 * Creates a Stripe Checkout Session for payment processing
 */
export async function createCheckoutSession(
  params: CheckoutSessionParams
): Promise<{ sessionId: string; url: string }> {
  const { orderId, orderNumber, items, total, customerEmail, baseUrl } = params;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: stripeConfig.currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?orderNumber=${orderNumber}`,
      cancel_url: `${baseUrl}/checkout`,
      customer_email: customerEmail,
      metadata: {
        orderId: orderId.toString(),
        orderNumber,
      },
      payment_intent_data: {
        metadata: {
          orderId: orderId.toString(),
          orderNumber,
        },
      },
    });

    if (!session.id || !session.url) {
      throw new Error('Failed to create Stripe Checkout Session');
    }

    return {
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating Stripe Checkout Session:', error);
    throw new Error('Failed to create payment session');
  }
}

/**
 * Constructs and validates a Stripe webhook event
 * https://docs.stripe.com/webhooks/signature
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  try {
    console.log('secret:', stripeConfig.webhookSecret);
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      stripeConfig.webhookSecret
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw new Error('Invalid webhook signature');
  }
}

/**
 * Processes a completed checkout session
 * Returns the order ID and payment details
 */
export function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
): {
  orderId: number;
  orderNumber: string;
  paymentIntentId: string | null;
  paymentStatus: string;
  amountTotal: number;
  currency: string;
  paymentMethod: string | null;
} {
  const orderId = session.metadata?.orderId;
  const orderNumber = session.metadata?.orderNumber;

  if (!orderId || !orderNumber) {
    throw new Error('Order metadata missing from checkout session');
  }

  return {
    orderId: parseInt(orderId, 10),
    orderNumber,
    paymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
    paymentStatus: session.payment_status,
    amountTotal: session.amount_total ? session.amount_total / 100 : 0,
    currency: session.currency || stripeConfig.currency,
    paymentMethod: typeof session.payment_method_types?.[0] === 'string' 
      ? session.payment_method_types[0] 
      : null,
  };
}

export { stripe };

