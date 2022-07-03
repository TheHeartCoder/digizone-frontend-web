import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://arindam:arindam@test.g7xwc.mongodb.net/digizone?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true,
        w: 1,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
