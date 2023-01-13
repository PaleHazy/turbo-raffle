import { createConnection } from 'typeorm';

import usersRepository from '../src/repositories/users.repository';

import { faker } from '@faker-js/faker';

import connectionOpts from './scriptsConnections';

// create connection with database

createConnection(connectionOpts).then(async connection => {
  async function addUser() {
    const userRepo = new usersRepository();
    await userRepo.userCreate({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }

  await addUser();
  connection.close();
});
