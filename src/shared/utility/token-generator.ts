import * as jwt from 'jsonwebtoken';
import config from 'config';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, config.get('tokenSecret'), {
    expiresIn: '30d',
  });
};

export const decodedPayloadFromToken = (token: string) => {
  return jwt.verify(token, config.get('tokenSecret'));
};
