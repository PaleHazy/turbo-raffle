import { EntityRepository } from 'typeorm';
import { HttpException } from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';
import { RaffleEntity } from '../entities/raffles.entity';
import { RaffleDto } from '../dtos/raffles.dto';
import type { Ticket, Raffle, Item } from 'interfaces';
import { TicketEntity } from '../entities/tickets.entity';
import { ItemEntity } from '../entities/items.entity';
import { ItemDto } from '../dtos/items.dto';
import { CategoryEntity } from '../entities/categories.entity';

@EntityRepository()
export default class ItemsRepository {
  // public async raffleFindAll(): Promise<Raffle[]> {

  // }

  public async getAllItems(): Promise<ItemEntity[]> {
    const items = await ItemEntity.find();
    return items;
  }

  public async itemCreate(itemData: ItemDto): Promise<Item> {
    if (isEmpty(itemData)) throw new HttpException(400, 'ItemData is empty');
    const item = new ItemEntity();

    // if the itemData has category, find the category entity to make sure it exists.
    // this could be enhanced with some sort of strings to ids mapping instead of a
    // direct lookup in the database
    if (itemData.categoryId) {
      const category = await CategoryEntity.findOne({ where: { category_id: itemData.categoryId } });
      // const category = await ItemEntity.findOne({ where: { id: itemData.categoryId } });
      console.log('category', category);
      if (!category) throw new HttpException(409, "Category doesn't exist");

      item.categories = [category];
    }

    // make sure items has a valid name
    if (itemData.name) {
      item.name = itemData.name;
    } else {
      throw new HttpException(400, 'Item name is empty');
    }

    item.type = 'type3232';
    item.rarity = 'rarityw545';
    item.group = 'groupw545';
    await item.save();
    return item;
  }
}
