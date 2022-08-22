import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { StripeModule } from 'nestjs-stripe';
import config from 'config';
import { AuthMiddleware } from 'src/shared/middleware/auth';
import { Users, UserSchema } from 'src/shared/schema/users';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { Orders, OrderSchema } from 'src/shared/schema/orders';
import { OrdersRepository } from 'src/shared/repositories/orders.repository';
import { ProductRepository } from 'src/shared/repositories/products.repository';
import { Products, ProductSchema } from 'src/shared/schema/products';
import { License, LicenseSchema } from 'src/shared/schema/license';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/shared/middleware/roles.guard';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    UserRepository,
    OrdersRepository,
    ProductRepository,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    StripeModule.forRoot({
      apiKey: config.get('stripe.secret_key'),
      apiVersion: '2022-08-01',
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Orders.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: License.name, schema: LicenseSchema }]),
  ],
})
export class OrdersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: `${config.get('appPrefix')}/orders/webhook`,
        method: RequestMethod.POST,
      })
      .forRoutes(OrdersController);
  }
}
