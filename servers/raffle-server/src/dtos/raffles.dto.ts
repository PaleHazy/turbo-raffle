import { Raffle } from '@/typedefs/raffles.type';
import { IsEmail, isString, IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class RaffleDto implements Partial<Raffle> {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;
}
