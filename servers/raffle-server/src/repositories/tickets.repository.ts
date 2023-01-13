import { EntityRepository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import type { Ticket } from 'interfaces';
import { TicketEntity } from '@/entities/tickets.entity';
import { TicketDto } from '@/dtos/tickets.dto';
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
    if (isEmpty(ticketData)) throw new HttpException(400, 'ticketData is empty');

    console.log('ticketData', ticketData);
    // business logic
    const raffle = await RaffleEntity.findOne({ where: { id: ticketData.raffleId } });
    if (!raffle) throw new HttpException(409, "Raffle doesn't exist");

    const ticket = new TicketEntity();
    ticket.raffle = raffle;
    ticket.valueInDollars = ticketData.valueInDollars;
    await ticket.save();
    return ticket;
  }
}
