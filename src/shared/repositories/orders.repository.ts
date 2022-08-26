import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from '../schema/orders';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(Orders.name)
    private readonly ordersModel: Model<Orders>,
  ) {}

  // create order details
  async createOrderInDB(data: Record<string, any>): Promise<Orders> {
    const order = new this.ordersModel(data);
    return await order.save();
  }

  // get order details by session id
  async getOrderDetailsBySessionId(sessionId: string): Promise<any> {
    const order = await this.ordersModel.findOne({
      checkoutSessionId: sessionId,
    });
    return order;
  }

  // get order details by id
  async getOrderDetailsById(id: string): Promise<any> {
    const order = await this.ordersModel.findById(id);
    return order;
  }

  // get all orders
  async getAllOrders(query = {}): Promise<any> {
    const orders = await this.ordersModel.find(query);
    return orders;
  }

  // get all orders for a user
  async getAllOrdersForUser(userId: string): Promise<any> {
    const orders = await this.ordersModel.find({ user: userId });
    return orders;
  }

  // update order details
  async updateOrderDetailsInDB(
    id: string,
    data: Record<string, any>,
  ): Promise<any> {
    return await this.ordersModel.findOneAndUpdate(
      { checkoutSessionId: id },
      { $set: data },
      { new: true },
    );
  }

  // get order details by customer id and product id
  async findOrderByCustomerIdAndProductId(
    userId: string,
    productId: string,
  ): Promise<any> {
    const order = await this.ordersModel.findOne({
      user: userId,
      'orderedItems.productId': productId,
    });
    return order;
  }
}
