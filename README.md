

### Fronted

- `docs`: a [Next.js](https://nextjs.org) app  https://nextra.site/docs
- `web`: another [Next.js](https://nextjs.org) app

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Packages
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)

### Servers
- `raffle-server`: api server for creating users, and getting raffle information

### Build

To build all apps and packages, run the following command:

```
cd turbo-raffle
pnpm run build
```

### Develop

To develop all apps and packages, run the following command at the root:

```
cd turbo-raffle
pnpm run dev
```
### Developing on a Single Project 

To develop on a single project, run the following command at the root:

```
cd turbo-raffle
pnpm run dev --filter <project-name>
```
