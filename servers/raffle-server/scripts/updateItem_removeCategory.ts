import { createConnection } from 'typeorm';

import ItemsRepo from '../src/repositories/items.repository';

import { faker } from '@faker-js/faker';

import connectionOpts from './scriptsConnections';
import { ItemEntity } from '../src/entities/items.entity';

// create connection with database
process.env.LOG_DIR = '../../scripts/logs';
createConnection(connectionOpts)
  .then(async c => {
    async function updateItem() {
      const itemE = await ItemEntity.findOne({
        relations: ['categories'],
      });

      console.log('itemE', itemE);

      // REMOVE THE CATEGORY FROM THE ITEM ENTITY
      const cat_id = '630dda58-3347-4c74-a807-be23f870454e';
      const cat = itemE.categories.find(c => c.category_id === cat_id);
      console.log('cat', cat);
      itemE.categories = itemE.categories.filter(c => c.category_id !== cat_id);
      console.log('itemE.categories', itemE.categories);
      await itemE.save();
    }

    await updateItem();
    c.close();
  })
  .catch(e => console.log(e));
