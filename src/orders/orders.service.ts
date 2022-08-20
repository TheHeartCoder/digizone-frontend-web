import { Injectable } from '@nestjs/common';
import { checkoutDtoArrDto } from './dto/checkout-body.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import config from 'config';

@Injectable()
export class OrdersService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async checkout(checkoutBody: checkoutDtoArrDto, user: Record<string, any>) {
    console.log(user);
    const session = await this.stripeClient.checkout.sessions.create({
      line_items: checkoutBody.checkoutDetails.map((item) => ({
        price: item.skuPriceId,
        quantity: item.quantity,
      })),
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      customer_email: user.email,
      success_url: config.get('stripe.successUrl'),
      cancel_url: config.get('stripe.cancelUrl'),
    });
    return {
      message: 'Payment checkout session successfully created',
      success: true,
      result: session.url,
    };
  }

  async webhookHandler(body: any, sig: any) {
    console.log(body, sig);
    console.log('--------------------------------');

    let event;

    try {
      event = await this.stripeClient.webhooks.constructEvent(
        body,
        sig,
        config.get('stripe.webhook_secret'),
      );
    } catch (err) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        const session = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        console.log('Webhook received A: ', session);
        break;
      case 'checkout.session.async_payment_succeeded':
        const sessions = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        console.log('Webhook received S: ', sessions);
        break;
      case 'checkout.session.completed':
        const sessiond = event.data.object;
        // Then define and call a function to handle the event checkout.session.completed
        console.log('Webhook received V: ', sessiond);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return true;
  }
}
