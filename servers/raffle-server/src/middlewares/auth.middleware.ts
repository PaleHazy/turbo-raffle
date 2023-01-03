import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { getRepository } from 'typeorm';
import { SECRET_KEY } from '@config';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import type { RequestWithUser, DataStoredInToken } from 'interfaces';
import { logger } from '@/utils/logger';

export const authMiddleware = async (req: any) => {
  try {
    logger.info('authMiddleware');

    console.log(req.cookies);
    console.log(req.headers);

    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const x = (await verify(Authorization, secretKey)) as DataStoredInToken;
      console.log('COOKIE', x);
      // const { id } = (await verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTY2NDQ3MjE4NiwiZXhwIjoxNjY0NDc1Nzg2fQ.3sl3-EwvkCT_VnqrOFfYSWXreR9-Nj2zoYFTH6VnlIk", secretKey)) as DataStoredInToken;
      console.log('AUTH MIDDLEWARE - COOKIE ID', x.id);
      const userRepository = getRepository(UserEntity);

      // const sessionRepository = getRepository(SessionEntity);
      const user = await userRepository.findOne(x.id, { select: ['id', 'email', 'password'] });
      console.log('AUTH MIDDLEWARE USER', user);
      return user;
    }
    console.log('UNAUTHORIZED, YO');
    return null;
  } catch (error) {
    throw new HttpException(401, 'Wrong authentication token');
  }
};

export const authChecker: AuthChecker<RequestWithUser> = async ({ context: { user } }) => {
  if (!user) {
    throw new HttpException(404, 'Authentication token missing');
  }

  return true;
};
