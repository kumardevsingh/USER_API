import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from '../services/auth.service';
import { sendTokenToCookie } from '../../../globals/helpers/cookie.helper';

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const accessToken = await authService.signup(req.body);
    sendTokenToCookie(res, accessToken);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'User signed up successfully' });
  }
  async signIn(req: Request, res: Response, next: NextFunction) {
    // Handle user login logic here
    const accessToken = await authService.signin(req.body);
    sendTokenToCookie(res, accessToken);
    res.status(StatusCodes.OK).json({ message: 'User logged in successfully' });
  }
}

export default new AuthController();
