import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { getRepository } from 'typeorm';
import { SECRET_KEY } from '@config';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import type { RequestWithUser, DataStoredInToken } from 'interfaces';
import { logger } from '@/utils/logger';

export const authMiddleware = async req => {
  try {
    logger.info('authMiddleware');
    console.log(req.cookies)
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      // const { id } = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const { id } = (await verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTY2NDQ3MjE4NiwiZXhwIjoxNjY0NDc1Nzg2fQ.3sl3-EwvkCT_VnqrOFfYSWXreR9-Nj2zoYFTH6VnlIk", secretKey)) as DataStoredInToken;
      console.log('AUTH MIDDLEWARE - COOKIE ID', id)
      const userRepository = getRepository(UserEntity);

      // const sessionRepository = getRepository(SessionEntity);
      const findUser = await userRepository.findOne(id, { select: ['id', 'email', 'password'] });
      console.log('AUTH MIDDLEWARE USER', findUser)
      return findUser;
    }
    console.log('UNAUTHORIZED')

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
