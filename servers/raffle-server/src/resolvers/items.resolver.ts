import { ItemDto } from '@/dtos/items.dto';
import ItemsRepository from '@/repositories/items.repository';
import { Item } from '@/typedefs/items.type';
import type { Item as I } from 'interfaces';
import { Arg, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class itemsResolver extends ItemsRepository {
  @Mutation(() => Item, {
    description: 'Item create',
  })
  async createItem(@Arg('itemData') itemData: ItemDto): Promise<I> {
    const item: I = await this.itemCreate(itemData);
    return item;
  }
}
