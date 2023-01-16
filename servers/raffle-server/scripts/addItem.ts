import { createConnection } from 'typeorm';

import ItemsRepo from '../src/repositories/items.repository';

import { faker } from '@faker-js/faker';

import connectionOpts from './scriptsConnections';
import { CategoryEntity } from '../src/entities/categories.entity';

// create connection with database

createConnection(connectionOpts).then(async c => {
  async function addItem() {
    const category = await CategoryEntity.findOne();
    const itemRepo = new ItemsRepo();
    await itemRepo.itemCreate({
      name: faker.commerce.productName(),
      categoryId: category.category_id,
    });
  }

  const loopTimes = process.argv[2] || 1;

  for (let i = 0; i < loopTimes; i++) {
    await addItem();
  }

  c.close();
});
