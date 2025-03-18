import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for the given user.
 * @param {User} user - The user object containing user details.
 * @returns {string} - The generated JWT token.
 */
export function generateToken(user: User) {
  const accessToken = jwt.sign(
    { name: user.name, email: user.email, id: user.id, role: user.role },
    process.env.JWT_SECRET! as string,
    {
      expiresIn: '1h',
    },
  );

  return accessToken;
}
