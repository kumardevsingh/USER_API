import { User } from '@prisma/client';
import prisma from '../../../globals/prisma';

import { BadRequestException } from '../../../globals/cores/error.core';

class UserService {
  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async create(requestBody: any): Promise<User> {
    const { name, email, role, password, isActive } = requestBody;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        password,
        is_active: isActive ?? false, // Handle isActive correctly
      },
    });
    return newUser;
  }
}

export default new UserService();
