import { Authorized, Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { CreateUserDto } from '@dtos/users.dto';
import AuthRepository from '@repositories/auth.repository';
import { User } from '@typedefs/users.type';
import { logger } from '@/utils/logger';
import { ExpressContext } from 'apollo-server-express';

@Resolver()
export class authResolver extends AuthRepository {
  @Mutation(() => User, {
    description: 'User signup',
  })
  async signup(@Arg('userData') userData: CreateUserDto): Promise<User> {
    const user: User = await this.userSignUp(userData);
    return user;
  }

  @Mutation(() => User, {
    description: 'User login',

  })
  async login(
    @Arg('userData') userData: CreateUserDto,
    @Ctx('res') res: ExpressContext["res"],
    ): Promise<User> {

    const { findUser, cookie } = await this.userLogIn(userData);
    console.log("cookie",cookie)

    res.cookie('Authorization', cookie, {
      secure: true,
      sameSite: 'none',
    })
    return findUser;
  }

  @Authorized()
  @Mutation(() => User, {
    description: 'User logout',
  })
  // here it the userId is expected
  async logout(@Ctx('user') userData: any): Promise<User> {
    const user = await this.userLogOut(userData);
    return user;
  }
}