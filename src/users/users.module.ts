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
import { AdminMiddleware, AuthMiddleware } from 'src/shared/middleware/auth';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, AdminMiddleware)
      .exclude(
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.POST },
      )
      .forRoutes(UsersController);
  }
}
