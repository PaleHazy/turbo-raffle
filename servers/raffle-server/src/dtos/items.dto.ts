import { Item } from '@/typedefs/items.type';
import { IsString } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class ItemDto implements Partial<Item> {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  categoryId?: string;
}
