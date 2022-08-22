import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
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
      const token = req.cookies._digi_auth_token;
      // const token = (authHeaders as string).split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Unauthorized! Missing Token');
      }
      const decoded: any = jwt.verify(token, config.get('tokenSecret'));
      const user: any = await this.userDB.getUserDetailsById(decoded.id);
      if (!user) {
        throw new UnauthorizedException('Unauthorized! User not Exists');
      }
      user.password = undefined;
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
