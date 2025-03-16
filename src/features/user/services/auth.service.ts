import prisma from '../../../globals/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    console.log('====== User created ========== :', user);
    const accessToken = jwt.sign(
      { name, email, id: user.id, role: user.role },
      process.env.JWT_SECRET! as string,
      {
        expiresIn: '1h',
      },
    );
    return accessToken;
  }
}

export default new AuthService();
