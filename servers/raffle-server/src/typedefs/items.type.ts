import { Field, ObjectType } from 'type-graphql';
import { Ticket } from './tickets.type';
import type { Ticket as T } from 'interfaces';
@ObjectType()
export class Item {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

}
