import { NextFunction, Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import { IUser } from '../interfaces/user.interface';

const prisma = new PrismaClient();

class UserController {
  getAll(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ message: 'Get all users', data: [] });
  }

  async add(req: Request<IUser>, res: Response, next: NextFunction) {
    try {
      const { name, email, role, password, isActive } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          role,
          password,
          is_active: isActive,
        },
      });
      res.status(201).json({ message: 'User created', data: newUser });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
