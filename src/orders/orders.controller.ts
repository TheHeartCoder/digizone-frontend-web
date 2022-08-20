import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Headers,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
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
    // const sig = req.headers['stripe-signature'];
    return await this.ordersService.webhookHandler(rawBody, signature);
  }
}
