import { Inject, Injectable } from '@nestjs/common';
import { checkoutDtoArrDto } from './dto/checkout-body.dto';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import config from 'config';
import { OrdersRepository } from 'src/shared/repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @Inject(OrdersRepository) private readonly orderDB: OrdersRepository,
  ) {}

  async create(createOrderDto: Record<string, any>) {
    return await this.orderDB.createOrderInDB(createOrderDto);
  }

  async findAll() {
    return await this.orderDB.getAllOrders();
  }

  async findOne(id: string) {
    return await this.orderDB.getOrderDetailsById(id);
  }

  async fullfillOrder(id: string, updateOrderDto: Record<string, any>) {
    return await this.orderDB.updateOrderDetailsInDB(id, updateOrderDto);
  }

  async checkout(checkoutBody: checkoutDtoArrDto, user: Record<string, any>) {
    console.log(user._id);
    console.log(checkoutBody);

    const session = await this.stripeClient.checkout.sessions.create({
      line_items: checkoutBody.checkoutDetails.map((item) => ({
        price: item.skuPriceId,
        quantity: item.quantity,
      })),
      metadata: {
        user_id: user._id.toString(),
        items: JSON.stringify(checkoutBody),
      },
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
        const sessiond: Record<string, any> = event.data.object;
        console.log('checkout.session.async_payment_failed :: ', sessiond);

        const orderDataC = await this.createOrderObject(sessiond);
        await this.fullfillOrder(sessiond.id, orderDataC);
        break;
      case 'checkout.session.async_payment_succeeded':
        const sessions: Record<string, any> = event.data.object;
        console.log('checkout.session.async_payment_succeeded :: ', sessions);
        const orderDataB = await this.createOrderObject(sessions);
        if (sessions.payment_status === 'paid') {
          await this.fullfillOrder(sessions.id, orderDataB);
        }
        break;
      case 'checkout.session.completed':
        const session: Record<string, any> = event.data.object;
        console.log('checkout.session.completed :: ', session);
        const orderData = await this.createOrderObject(session);
        await this.create(orderData);
        if (session.payment_status === 'paid') {
          await this.fullfillOrder(session.id, orderData);
        }
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return true;
  }

  // create order object
  async createOrderObject(orderData: Record<string, any>) {
    const order = {
      orderId: Math.floor(new Date().valueOf() * Math.random()),
      user: orderData.metadata?.user_id,
      customerAddress: orderData.customer_details?.address,
      customerPhoneNumber: orderData.customer_details?.phone,
      paymnetInfo: {
        paymentMethod: orderData.payment_method_types[0],
        paymentIntentId: orderData.payment_intent,
        paymentDate: new Date(),
        paymnetFailureReason: '',
        paymentAmount: orderData.amount_total / 100,
        paymentStatus: orderData.payment_status,
      },
      orderStatus: orderData.status,
      orderDate: new Date(),
      checkoutSessionId: orderData.id,
      orderedItems: JSON.parse(orderData.metadata?.items).checkoutDetails,
    };
    return order;
  }
}
