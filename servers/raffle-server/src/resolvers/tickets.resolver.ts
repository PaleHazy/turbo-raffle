import { TicketDto } from '@/dtos/tickets.dto';
import TicketRepository from '@/repositories/tickets.repository';
import { Ticket } from '@/typedefs/tickets.type';
import type { Ticket as T } from 'interfaces';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class ticketResolver extends TicketRepository {
  // @Query(() => [Raffle], {
  //   description: 'User find list',
  // })
  // async getUsers(): Promise<User[]> {
  //   const users: User[] = await this.userFindAll();
  //   return users;
  // }

  // @Query(() => Ticket, {
  //   description: 'User find by id',
  // })
  // async getUserById(@Arg('userId') userId: number): Promise<Ticket[]> {
  //   const tickets: Ticket[] = await this.ger(userId);
  //   return tickets;
  // }

  @Mutation(() => Ticket, {
    description: 'Ticket create',
  })
  async createTicket(@Arg('ticketData') ticketData: TicketDto): Promise<T> {
    const ticket: T = await this.ticketCreate(ticketData);
    return ticket;
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
