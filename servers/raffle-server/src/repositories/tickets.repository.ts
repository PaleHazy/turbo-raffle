import { EntityRepository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import type { Ticket } from 'interfaces';
import { TicketEntity } from '@/entities/tickets.entity';
import { TicketDto } from '@/dtos/tickets.dto';
import RaffleRepository from './raffles.repository';
import { RaffleEntity } from '@/entities/raffles.entity';


@EntityRepository()
export default class TicketRepository {
  // public async raffleFindAll(): Promise<Raffle[]> {


  // }

  // public async raffleFindById(raffleId: number): Promise<Ticket> {
  //   if (isEmpty(raffleId)) throw new HttpException(400, "UserId is empty");

  //   const ticket: Ticket = await TicketEntity.findOne({ where: { id: raffleId } });
  //   if (!ticket) throw new HttpException(409, "Raffle doesn't exist");

  //   return ticket;
  // }

  public async ticketCreate(ticketData: TicketDto): Promise<Ticket> {
    if (isEmpty(ticketData)) throw new HttpException(400, "ticketData is empty");

    console.log("ticketData", ticketData);
    // business logic
    const raffle = await  RaffleEntity.findOne({ where: { id: ticketData.raffleId } });
    if (!raffle) throw new HttpException(409, "Raffle doesn't exist");

    const ticket = new TicketEntity();
    ticket.raffle = raffle;
    ticket.valueInDollars = ticketData.valueInDollars;
    await ticket.save();
    return ticket;
  }

  // public async userUpdate(userId: number, userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

  //   const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   const hashedPassword = await hash(userData.password, 10);
  //   await UserEntity.update(userId, { ...userData, password: hashedPassword });

  //   const updateUser: User = await UserEntity.findOne({ where: { id: userId } });
  //   return updateUser;
  // }

  // public async userDelete(userId: number): Promise<User> {
  //   if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

  //   const findUser: User = await UserEntity.findOne({ where: { id: userId } });
  //   if (!findUser) throw new HttpException(409, "User doesn't exist");

  //   await UserEntity.delete({ id: userId });
  //   return findUser;
  // }
}
