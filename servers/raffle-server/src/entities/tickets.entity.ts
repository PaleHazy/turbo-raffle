import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, ManyToOne, IsNull } from 'typeorm';
import { ItemEntity } from './items.entity';
import { RaffleEntity } from './raffles.entity';
import { UserEntity } from './users.entity';
import type { User, Item, Ticket, Raffle } from 'interfaces';

@Entity()
export class TicketEntity extends BaseEntity implements Partial<Ticket> {
  @PrimaryGeneratedColumn()
  id: number;



  @ManyToOne(() => RaffleEntity,(raffle) => raffle.tickets)
  raffle: Raffle;



  @OneToOne(() => ItemEntity)
  @JoinTable()
  raffleItem: Item;



  @OneToOne(() => UserEntity)
  @JoinTable()
  owner: User;

  @Column()

  valueInDollars: number;

  @Column({
    nullable: true,
  })
  isSold: boolean;
}
