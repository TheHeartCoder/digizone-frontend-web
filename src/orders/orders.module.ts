import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { StripeModule } from 'nestjs-stripe';
import config from 'config';
import { AuthMiddleware } from 'src/shared/middleware/auth';
import { Users, UserSchema } from 'src/shared/schema/users';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/shared/repositories/users.repository';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, UserRepository],
  imports: [
    StripeModule.forRoot({
      apiKey: config.get('stripe.secret_key'),
      apiVersion: '2022-08-01',
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
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
