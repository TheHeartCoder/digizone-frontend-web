import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + 'Digizone backend service.....';
  }

  @Get('csrf-token')
  getCsrfToken(@Req() req: Request): any {
    const csrfToken = req.csrfToken();
    return {
      result: csrfToken,
    };
  }
}
