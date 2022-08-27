import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { LoggerInterceptor } from './loggerInterceptor';
import { TransformationInterceptor } from './responseInterceptor';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { raw } from 'express';
const ROOT_IGNORE_LIST = ['/api/v1/orders/webhook'];
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });
  app.use(cookieParser());
  app.use('/api/v1/orders/webhook', raw({ type: '*/*' }));

  const csrfMiddleware = csurf({
    cookie: true,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (ROOT_IGNORE_LIST.includes(req.url)) {
      next();
    } else {
      csrfMiddleware(req, res, next);
    }
  });

  // app.use(csurf({ cookie: true }));

  app.use(morgan('tiny'));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalInterceptors(new TransformationInterceptor());
  await app.listen(config.get('port'));
  console.log(`Server running on port ${config.get('port')}`);
}
bootstrap();
