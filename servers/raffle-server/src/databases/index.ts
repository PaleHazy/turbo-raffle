import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '../config';
import { logger } from '../utils/logger';

const dbConnection: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true,
  logging: true,
  logger: {
    log: query => {
      logger.info(query);
    },
    logMigration: query => {
      logger.info(query);
    },
    logQuery: query => {
      logger.info(query);
    },
    logQueryError: query => {
      logger.error(query);
    },
    logQuerySlow: query => {
      logger.info(query);
    },
    logSchemaBuild: query => {
      logger.info(query);
    },
  },
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migration/*{.ts,.js}')],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export default dbConnection;
