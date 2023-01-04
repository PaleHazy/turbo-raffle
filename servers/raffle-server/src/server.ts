import App from '@/app';
import validateEnv from '@utils/validateEnv';

import { authResolver } from '@resolvers/auth.resolver';
import { userResolver } from '@resolvers/users.resolver';
import { raffleResolver } from './resolvers/raffles.resolver';
import { ticketResolver } from './resolvers/tickets.resolver';
import { itemsResolver } from './resolvers/items.resolver';

validateEnv();

const app = new App([authResolver, userResolver, raffleResolver, ticketResolver, itemsResolver]);

app.listen();
