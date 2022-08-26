import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from 'src/shared/repositories/products.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from 'src/shared/schema/products';
import { AuthMiddleware } from 'src/shared/middleware/auth';
import config from 'config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/shared/middleware/roles.guard';
import { Users, UserSchema } from 'src/shared/schema/users';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { License, LicenseSchema } from 'src/shared/schema/license';
import { StripeModule } from 'nestjs-stripe';
import { Orders, OrderSchema } from 'src/shared/schema/orders';
import { OrdersRepository } from 'src/shared/repositories/orders.repository';
@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository,
    UserRepository,
    OrdersRepository,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: License.name, schema: LicenseSchema }]),
    MongooseModule.forFeature([{ name: Orders.name, schema: OrderSchema }]),
    StripeModule.forRoot({
      apiKey: config.get('stripe.secret_key'),
      apiVersion: '2022-08-01',
    }),
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: `${config.get('appPrefix')}/products`,
          method: RequestMethod.GET,
        },
        {
          path: `${config.get('appPrefix')}/products/:id`,
          method: RequestMethod.GET,
        },
      )
      .forRoutes(ProductsController);
  }
}
