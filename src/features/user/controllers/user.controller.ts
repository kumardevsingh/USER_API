import { NextFunction, Response, Request } from 'express';
import { IUser } from '../interfaces/user.interface';
import userService from '../services/user.service';
import { StatusCodes } from 'http-status-codes';

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await userService.getAll();
    res.status(StatusCodes.OK).json({ message: 'Get all users', data: users });
  }

  async create(req: Request<IUser>, res: Response, next: NextFunction) {
    const user = await userService.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'User created', data: user });
  }
}

export default new UserController();
