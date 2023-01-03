import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { EntityRepository } from 'typeorm';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import type { User, DataStoredInToken, TokenData } from 'interfaces';
import { isEmpty } from '@utils/util';
import { ExpressContext } from 'apollo-server-express';

@EntityRepository(UserEntity)
export default class AuthRepository {
  public async userSignUp(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();

    return createUserData;
  }

  public async userLogIn(userData: CreateUserDto, res: ExpressContext['res']): Promise<{ findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    res.cookie('Authorization', tokenData.token, {
      secure: true,
      sameSite: 'none',
      // httpOnly: false,
      maxAge: tokenData.expiresIn, // 1 hour
    });

    return { findUser };
  }

  public async userLogOut(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'userId is empty');

    const findUser: User = await UserEntity.findOne({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24 * 7;

    return { expiresIn: expiresIn * 1000, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}
