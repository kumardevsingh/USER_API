import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import authService from '../services/auth.service';

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const accessToken = await authService.signup(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'User signed up successfully', data: accessToken });
  }
  async signIn(req: Request, res: Response, next: NextFunction) {
    // Handle user login logic here
    const accessToken = await authService.signin(req.body);

    res
      .status(StatusCodes.OK)
      .json({ message: 'User logged in successfully', data: accessToken });
  }
}

export default new AuthController();
