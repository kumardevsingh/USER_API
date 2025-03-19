import { Response } from 'express';

export function sendTokenToCookie(res: Response, accessToken: string) {
  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60, // 1 hour
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
  });
  //   let cookieString = `${name}=${value};`;

  //   if (options) {
  //     if (options.maxAge) {
  //       cookieString += ` Max-Age=${options.maxAge};`;
  //     }
  //     if (options.httpOnly) {
  //       cookieString += ' HttpOnly;';
  //     }
  //     if (options.secure) {
  //       cookieString += ' Secure;';
  //     }
  //     if (options.sameSite) {
  //       cookieString += ` SameSite=${options.sameSite};`;
  //     }
  //   }

  //   res.setHeader('Set-Cookie', cookieString);
}
