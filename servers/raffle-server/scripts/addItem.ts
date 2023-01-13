import { createConnection } from 'typeorm';

import ItemsRepo from '../src/repositories/items.repository';

import { faker } from '@faker-js/faker';

import connectionOpts from './scriptsConnections';

// create connection with database

createConnection(connectionOpts).then(async c => {
  async function addItem() {
    const itemRepo = new ItemsRepo();
    await itemRepo.itemCreate({
      name: faker.commerce.productName(),
      categoryId: '630dda58-3347-4c74-a807-be23f870454e',
    });
  }

  const loopTimes = process.argv[2] || 1;

  for (let i = 0; i < loopTimes; i++) {
    await addItem();
  }

  c.close();
});
