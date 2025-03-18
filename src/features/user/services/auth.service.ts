import prisma from '../../../globals/prisma';
import bcrypt from 'bcrypt';
import { BadRequestException } from '../../../globals/cores/error.core';
import { generateToken } from '../../../globals/helpers/jwt.helper';

class AuthService {
  async signup(requestBody: any) {
    const { name, email, password } = requestBody;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role: 'CANDIDATE',
      },
    });
    const accessToken = generateToken(user);
    return accessToken;
  }

  async signin(requestBody: any) {
    const { email, password } = requestBody;
    const user = await this.findByEmail(email);

    if (!user) {
      throw new BadRequestException(`email ${email} not found`);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid password');
    }
    const accessToken = generateToken(user);
    return accessToken;
  }
  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email },
    });
  }
}

export default new AuthService();
