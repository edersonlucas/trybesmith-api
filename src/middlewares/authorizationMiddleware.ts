import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Auth from '../utils/Auth';
import ErrorGenerator from '../utils/ErrorGenerator';

const auth = new Auth();

interface RequestAuth extends Request {
  user?: JwtPayload | string
}

export default (
  req: RequestAuth,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  if (token) {
    const user = auth.Authorization(token);
    req.user = user;
    return next();
  }
  throw new ErrorGenerator(401, 'Token not found');
};