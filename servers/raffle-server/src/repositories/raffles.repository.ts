import { EntityRepository } from 'typeorm';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { RaffleEntity } from '@/entities/raffles.entity';
import { RaffleDto } from '@/dtos/raffles.dto';
import type { Ticket, Raffle } from 'interfaces';
import { TicketEntity } from '@/entities/tickets.entity';

@EntityRepository()
export default class RaffleRepository {
  // public async raffleFindAll(): Promise<Raffle[]> {


  // }

  public async raffleFindById(raffleId: number): Promise<Raffle> {
    if (isEmpty(raffleId)) throw new HttpException(400, "UserId is empty");

    const raffle: Raffle = await RaffleEntity.findOne({ where: { id: raffleId } });
    if (!raffle) throw new HttpException(409, "Raffle doesn't exist");

    return raffle;
  }

  public async getTickets(raffleId: number): Promise<Ticket[]> {
    if (isEmpty(raffleId)) throw new HttpException(400, "UserId is empty");

    const raffle: Raffle = await RaffleEntity.findOne({ where: { id: raffleId } });
    if (!raffle) throw new HttpException(409, "Raffle doesn't exist");
    console.log("raffle", raffle);
    const tickets = await TicketEntity.find({
      relations: ["raffle"],
    })
    console.log("tickets", tickets);
    return tickets;
  }

  public async raffleCreate(raffleData: RaffleDto): Promise<Raffle> {
    if (isEmpty(raffleData)) throw new HttpException(400, "raffleData is empty");

    // business logic
    const raffle = new RaffleEntity();
    raffle.name = raffleData.name;
    raffle.description = raffleData.description;
    await raffle.save();
    return raffle;

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
