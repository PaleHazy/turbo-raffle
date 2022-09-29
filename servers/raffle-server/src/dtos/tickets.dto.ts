import type { Ticket } from 'interfaces';
import { IsNumber, IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class TicketDto implements Partial<Ticket> {
  @Field()
  @IsNumber()
  valueInDollars: number;

  @Field()
  @IsNumber()
  raffleId: number;
}
