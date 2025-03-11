import { NextFunction, Response, Request } from 'express';
// import { PrismaClient } from '@prisma/client';
import { IUser } from '../interfaces/user.interface';
import prisma from '../../../globals/prisma';

// const prisma = new PrismaClient();

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({ message: 'Get all users', data: users });
    } catch (error) {
      res.json({ message: 'Error getting all users', error });
      // next(error);
    }
  }

  async create(req: Request<IUser>, res: Response, next: NextFunction) {
    try {
      const { name, email, role, password, isActive } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          role,
          password,
          is_active: isActive ?? false, // Handle isActive correctly
        },
      });
      res.status(201).json({ message: 'User created', data: newUser });
    } catch (error) {
      res.json({ message: 'Error creating user', error });
      // next(error);
    }
  }
}

export default new UserController();
