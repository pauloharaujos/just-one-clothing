/**
 * Stripe Webhook Handler
 * Handles Stripe webhook events, particularly checkout.session.completed
 * For testing purpose, use Stripe Cli:  stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/
webhook
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { constructWebhookEvent, handleCheckoutSessionCompleted } from '@/services/stripe/stripeService';
import { 
  updateOrderPayment,
  getOrderPaymentBySessionId,
  updateOrderStatus 
} from '@/repository/orderPaymentRepository';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
      console.error('Missing Stripe signature');
      return NextResponse.json(
        { error: 'Missing Stripe signature' },
        { status: 400 }
      );
    }

    let event;
    try {
      event = constructWebhookEvent(body, signature);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      try {
        const paymentData = handleCheckoutSessionCompleted(session);
        
        const orderPayment = await getOrderPaymentBySessionId(session.id);
        
        if (!orderPayment) {
          console.error(`OrderPayment not found for session ID: ${session.id}`);
          return NextResponse.json(
            { error: 'Order payment not found' },
            { status: 404 }
          );
        }

        await updateOrderPayment(orderPayment.orderId, {
          stripePaymentIntent: paymentData.paymentIntentId || undefined,
          paymentStatus: 'COMPLETED',
          paymentMethod: paymentData.paymentMethod || undefined,
        });

        await updateOrderStatus(paymentData.orderId, 'COMPLETED');

        console.log(`Order ${paymentData.orderNumber} payment completed successfully`);
        
        return NextResponse.json({ received: true });
        
      } catch (error) {
        console.error('Error processing checkout.session.completed:', error);
        return NextResponse.json(
          { error: 'Failed to process payment completion' },
          { status: 500 }
        );
      }
    }

    console.log(`Unhandled event type: ${event.type}`);
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
