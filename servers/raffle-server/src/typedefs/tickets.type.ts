
import { Field, ObjectType } from 'type-graphql';
import { Item } from './items.type';
import type { Item as I, Raffle as R, Ticket as T } from 'interfaces';
import { Raffle } from './raffles.type';
import { User } from './users.type';
@ObjectType()
export class Ticket {
  @Field()
  id: number;

  @Field(() => Raffle)
  raffle: R;

  @Field(() => Item)
  raffleItem: I;

  @Field(() => [Ticket])
  tickets: T[];

  @Field()
  owner: User;

  @Field()
  valueInDollars: number;

  @Field()
  isSold: boolean;
}
