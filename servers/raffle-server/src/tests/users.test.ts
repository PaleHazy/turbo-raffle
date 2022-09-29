import request from 'supertest';
import App from '../app';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import { userResolver } from '@/resolvers/users.resolver';


afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {

  let app: App;
  beforeAll(async () => {
    app = new App([userResolver]);
  });
  describe('[GET] /users', () => {
    it('response statusCode 200 / findAll', () => {
      const mutation = `mutation {
        getUsers(input: {
          stringField: "12345",
          numberField: 5,
        }) {
          field
        }
      }`;

    });
  });

  describe('[GET] /users/:id', () => {
    it('response statusCode 200 / findOne', () => {
      const userId = 1;

    });
  });

  describe('[POST] /users', () => {
    it('response statusCode 201 / created', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };

    });
  });

  describe('[PUT] /users/:id', () => {
    it('response statusCode 200 / updated', async () => {
      const userId = 1;
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4',
      };

    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response statusCode 200 / deleted', () => {
      const userId = 1;

    });
  });
});
