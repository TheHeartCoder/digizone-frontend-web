import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { Request, Response, NextFunction } from 'express';
import config from 'config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(UserRepository) private readonly userDB: UserRepository,
  ) {}
  async use(req: Request | any, res: Response, next: NextFunction) {
    try {
      const authHeaders = req.headers.authorization;
      const token = (authHeaders as string).split(' ')[1];
      if (!authHeaders || !token) {
        throw new Error('Un authorized - 01');
      }
      const decoded: any = jwt.verify(token, config.get('tokenSecret'));
      const user: any = await this.userDB.getUserDetailsById(decoded.id);
      if (!user) {
        throw new Error('Un authorized - 02');
      }
      user.password = undefined;
      req.user = user;
      next();
    } catch (error) {
      throw new Error('Un authorized - 03');
    }
  }
}
