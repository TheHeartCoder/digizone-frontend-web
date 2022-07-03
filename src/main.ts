import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.get('port'));
  console.log(`Server running on port ${config.get('port')}`);
}
bootstrap();
