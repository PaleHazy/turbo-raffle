# Common build stage
FROM node:14.14.0-alpine3.12 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install -g pnpm

RUN pnpm install

EXPOSE 3005

# Development build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["pnpm", "run", "dev:standalone"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["pnpm", "run", "start"]
