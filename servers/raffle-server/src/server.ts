import App from '@/app';
import validateEnv from '@utils/validateEnv';

import { authResolver } from '@resolvers/auth.resolver';
import { userResolver } from '@resolvers/users.resolver';
import { raffleResolver } from './resolvers/raffles.resolver';
import { ticketResolver } from './resolvers/tickets.resolver';

validateEnv();

const app = new App([authResolver, userResolver, raffleResolver, ticketResolver]);

app.listen();
