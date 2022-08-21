import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Headers,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { checkoutDtoArrDto } from './dto/checkout-body.dto';
// import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post('/checkout')
  async checkout(@Body() checkoutBody: checkoutDtoArrDto, @Req() req: any) {
    return await this.ordersService.checkout(checkoutBody, req.user);
  }

  @Post('/webhook')
  async webhookHandler(
    @Body() rawBody: Buffer,
    @Headers('stripe-signature') signature: string,
  ) {
    return await this.ordersService.webhookHandler(rawBody, signature);
  }
}
