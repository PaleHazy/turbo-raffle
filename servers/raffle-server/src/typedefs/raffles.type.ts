import { Field, ObjectType } from 'type-graphql';
import { Item } from './items.type';
import type { Item as I, Ticket as T } from 'interfaces';
import { Ticket } from './tickets.type';

@ObjectType()
export class Raffle {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Ticket])
  tickets: T[];

  @Field(() => Item)
  raffleItem: I;
}
