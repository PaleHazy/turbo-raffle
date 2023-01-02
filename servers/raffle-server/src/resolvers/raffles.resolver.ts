import { RaffleDto } from '@/dtos/raffles.dto';
import { TicketEntity } from '@/entities/tickets.entity';
import { HttpException } from '@/exceptions/HttpException';
import RaffleRepository from '@/repositories/raffles.repository';
import { Raffle } from '@/typedefs/raffles.type';
import { Ticket } from '@/typedefs/tickets.type';
import type { Ticket as T } from 'interfaces';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';


@Resolver()
export class raffleResolver extends RaffleRepository {
  // @Query(() => [Raffle], {
  //   description: 'User find list',
  // })
  // async getUsers(): Promise<User[]> {
  //   const users: User[] = await this.userFindAll();
  //   return users;
  // }

  @Query(() => [Ticket], {
    description: 'find all tickets of this raffle',
  })
  async tickets(@Arg('raffleId') raffleId: number): Promise<T[]> {
    const ts: T[] = await this.getTickets(raffleId);
    return ts;
  }

  @Mutation(() => Raffle, {
    description: 'Raffle create',
  })
  async createRaffle(@Arg('raffleData') raffleData: RaffleDto): Promise<Raffle> {
    const raffle: Raffle = await this.raffleCreate(raffleData);
    return raffle;
  }

  // @Mutation(() => User, {
  //   description: 'User update',
  // })
  // async updateUser(@Arg('userId') userId: number, @Arg('userData') userData: CreateUserDto): Promise<User> {
  //   const user: User = await this.userUpdate(userId, userData);
  //   return user;
  // }

  // @Mutation(() => User, {
  //   description: 'User delete',
  // })
  // async deleteUser(@Arg('userId') userId: number): Promise<User> {
  //   const user: User = await this.userDelete(userId);
  //   return user;
  // }
}
