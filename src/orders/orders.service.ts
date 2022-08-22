import { Inject, Injectable } from '@nestjs/common';
import { checkoutDtoArrDto } from './dto/checkout-body.dto';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import config from 'config';
import { OrdersRepository } from 'src/shared/repositories/orders.repository';
import { ProductRepository } from 'src/shared/repositories/products.repository';
import { UserRepository } from 'src/shared/repositories/users.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @Inject(OrdersRepository) private readonly orderDB: OrdersRepository,
    @Inject(ProductRepository) private readonly productDB: ProductRepository,
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}

  async create(createOrderDto: Record<string, any>) {
    const orderExists = await this.orderDB.getOrderDetailsBySessionId(
      createOrderDto?.checkoutSessionId,
    );
    if (orderExists) return true;

    return await this.orderDB.createOrderInDB(createOrderDto);
  }

  async findAll(user: Record<string, any>, status?: string) {
    const existUser = await this.userDB.getUserDetailsById(user._id.toString());
    const query = {} as Record<string, any>;
    if (existUser.type === 'customer') query.userId = user._id.toString();
    if (status) query.orderStatus = status;
    const result = await this.orderDB.getAllOrders(query);
    return {
      message: 'Orders found',
      success: true,
      result,
    };
  }

  async findOne(id: string) {
    const result = await this.orderDB.getOrderDetailsById(id);
    return {
      message: 'Order details fetched successfully',
      success: true,
      result: result,
    };
  }

  async fullfillOrder(id: string, updateOrderDto: Record<string, any>) {
    console.log('fullfillOrder :: ');
    return await this.orderDB.updateOrderDetailsInDB(id, updateOrderDto);
  }

  async checkout(checkoutBody: checkoutDtoArrDto, user: Record<string, any>) {
    const session = await this.stripeClient.checkout.sessions.create({
      line_items: checkoutBody.checkoutDetails.map((item) => ({
        price: item.skuPriceId,
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          maximum: 5,
          minimum: 1,
        },
      })),
      metadata: {
        user_id: user._id.toString(),
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
        const orderDataC = await this.createOrderObject(sessiond);
        await this.fullfillOrder(sessiond.id, orderDataC);
        break;
      case 'checkout.session.async_payment_succeeded':
        const sessions: Record<string, any> = event.data.object;
        const orderDataB = await this.createOrderObject(sessions);
        if (sessions.payment_status === 'paid') {
          // check order is already completed or not
          const orderExists = await this.orderDB.getOrderDetailsBySessionId(
            sessions.id,
          );
          if (orderExists.orderStatus === 'completed') return true;
          // get license for ordered items
          for (let i = 0; i < orderDataB.orderedItems.length; i++) {
            const item = orderDataB.orderedItems[i];
            // get license for item
            const license = await this.getLicense(
              orderDataB.orderId + '',
              item.skuCode,
              item.productId,
            );
            // add license to order
            orderDataB.orderedItems[i].license = license;
          }

          await this.fullfillOrder(sessions.id, orderDataB);
        }
        break;
      case 'checkout.session.completed':
        const session: Record<string, any> = event.data.object;
        // check order is already completed or not
        const orderExists = await this.orderDB.getOrderDetailsBySessionId(
          sessions.id,
        );
        if (orderExists) return true;
        const orderData = await this.createOrderObject(session);
        await this.create(orderData);
        if (session.payment_status === 'paid') {
          if (orderExists.orderStatus !== 'completed') {
            // get license for ordered items
            for (let i = 0; i < orderDataB.orderedItems.length; i++) {
              const item = orderDataB.orderedItems[i];
              // get license for item
              const license = await this.getLicense(
                orderDataB.orderId + '',
                item.skuCode,
                item.productId,
              );
              // add license to order
              orderDataB.orderedItems[i].license = license;
            }
          }
          await this.fullfillOrder(session.id, orderData);
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return true;
  }

  // getLicense
  async getLicense(orderId: string, skuCode: string, productId: string) {
    const product = await this.productDB.getProductDetailsById(productId);
    const skuDetails = await product.skuDetails.find(
      (sku: { skuCode: string }) => sku.skuCode === skuCode,
    );
    const license = await this.productDB.updateLicenseKeysForProductSkuInDBV2(
      {
        product: productId,
        productSku: skuDetails._id,
        isSold: false,
      },
      {
        isSold: true,
        orderId,
      },
    );
    return license.licenseKey;
  }

  // create order object
  async createOrderObject(orderData: Record<string, any>) {
    const lineItems = await this.stripeClient.checkout.sessions.listLineItems(
      orderData.id,
    );

    const order = {
      orderId: Math.floor(new Date().valueOf() * Math.random()) + '',
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
      orderDate: new Date(),
      checkoutSessionId: orderData.id,
      orderedItems: lineItems.data.map((item) => {
        item.price.metadata.quantity = item.quantity + '';
        return item.price.metadata;
      }),
    };
    return order;
  }
}
