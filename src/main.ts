import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { LoggerInterceptor } from './loggerInterceptor';
import { TransformationInterceptor } from './responseInterceptor';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  app.use(csurf({ cookie: true }));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalInterceptors(new TransformationInterceptor());
  await app.listen(config.get('port'));
  console.log(`Server running on port ${config.get('port')}`);
}
bootstrap();
