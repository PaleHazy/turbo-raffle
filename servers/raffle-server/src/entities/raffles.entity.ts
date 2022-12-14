import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import type { Raffle } from 'interfaces';
import { ItemEntity } from './items.entity';
import { TicketEntity } from './tickets.entity';

@Entity()
export class RaffleEntity extends BaseEntity implements Raffle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @IsNotEmpty()
  @OneToOne(() => ItemEntity)
  @JoinTable()
  raffleItem: ItemEntity;

  @OneToMany(() => TicketEntity, ticket => ticket.raffle)
  tickets: TicketEntity[];
}
