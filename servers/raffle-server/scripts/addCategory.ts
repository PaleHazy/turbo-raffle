import { createConnection } from 'typeorm';

import { CategoryEntity } from '../src/entities/categories.entity';

import { faker } from '@faker-js/faker';

import connectionOpts from './scriptsConnections';

// create connection with database

createConnection(connectionOpts).then(async c => {
  async function addCategory() {
    const cat = new CategoryEntity();
    cat.name = faker.science.chemicalElement().name;
    await cat.save();
  }

  await addCategory();
  c.close();
});
