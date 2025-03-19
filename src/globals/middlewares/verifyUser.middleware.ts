import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../cores/error.core';
import jwt from 'jsonwebtoken';

export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies['accessToken'];
  if (!accessToken) {
    throw new BadRequestException('No access token provided');
  }
  const user = (await jwt.verify(
    accessToken,
    process.env.JWT_SECRET! as string,
  )) as UserPayload;
  if (!user) {
    throw new BadRequestException('Invalid access token');
  }
  req.currentUser = user;
  next();
}
