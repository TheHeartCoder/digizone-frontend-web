import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/shared/schema/users';
import { AuthMiddleware } from 'src/shared/middleware/auth';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/shared/middleware/roles.guard';
import config from 'config';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: `${config.get('appPrefix')}/users/login`,
          method: RequestMethod.POST,
        },
        {
          path: `${config.get('appPrefix')}/users`,
          method: RequestMethod.POST,
        },
        {
          path: `${config.get('appPrefix')}/users/forgot-password/:email`,
          method: RequestMethod.GET,
        },
        {
          path: `${config.get('appPrefix')}/users/verify-email/:otp/:email`,
          method: RequestMethod.GET,
        },
        {
          path: `${config.get('appPrefix')}/users/send-otp-mail/:email`,
          method: RequestMethod.GET,
        },
        {
          path: `${config.get('appPrefix')}/users/logout`,
          method: RequestMethod.PUT,
        },
      )
      .forRoutes(UsersController);
  }
}
