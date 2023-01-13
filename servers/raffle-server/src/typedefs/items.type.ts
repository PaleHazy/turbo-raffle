import { Field, ObjectType } from 'type-graphql';
@ObjectType()
export class Item {
  @Field()
  id: string;

  @Field()
  name: string;
}
