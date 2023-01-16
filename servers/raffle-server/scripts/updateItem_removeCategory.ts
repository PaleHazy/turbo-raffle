import { createConnection } from 'typeorm';

import ItemsRepo from '../src/repositories/items.repository';

import { faker } from '@faker-js/faker';

import connectionOpts from './scriptsConnections';
import { ItemEntity } from '../src/entities/items.entity';

// create connection with database

createConnection(connectionOpts)
  .then(async c => {
    async function updateItem() {
      const itemE = await ItemEntity.findOne();
      console.log('itemE', itemE);

      const res = await c.createQueryBuilder().select('items').from(ItemEntity, 'items').leftJoinAndSelect('items.category', 'category').getMany();
      console.log('res', res);
      // itemE.category = null;
      // await itemE.save();
    }

    await updateItem();
    c.close();
  })
  .catch(e => console.log(e));
