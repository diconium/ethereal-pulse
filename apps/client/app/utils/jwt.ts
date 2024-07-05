import jwt from 'jsonwebtoken';
import type { JWTPayload, JWTVerifyResponse } from '~/types/auth';

export class JWT {
  private jwtSecretKey: string;
  private jwtRefreshSecretKey: string;

  constructor() {
    if (!process.env.JWT_SECRET_KEY || !process.env.JWT_REFRESH_SECRET_KEY) {
      throw new Error('No secret key found');
    }
    
    this.jwtSecretKey = process.env.JWT_SECRET_KEY;
    this.jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;
  }

  generateAccessToken(userId: string) {
    const payload = {
      userId,
    };

    return jwt.sign(payload, this.jwtSecretKey, {
      algorithm: 'RS256',
      expiresIn: '10m',
    });
  }

  generateRefreshToken(userId: string) {
    const payload = {
      userId,
    };

    return jwt.sign(payload, this.jwtRefreshSecretKey, {
      algorithm: 'RS256',
      expiresIn: '7d',
    });
  }

  verifyAccessToken(token: string): JWTVerifyResponse {
    try {
      const decoded = jwt.verify(token, this.jwtSecretKey);
      return { success: true, data: decoded as JWTPayload };
    } catch (error) {
      return { success: false, error: error as Error};
    }
  }

  verifyRefreshToken(token: string): JWTVerifyResponse {
    try {
      const decoded = jwt.verify(token, this.jwtRefreshSecretKey);
      return { success: true, data: decoded as JWTPayload };
    } catch (error) {
      return { success: false, error: error as Error};
    }
  }
}
