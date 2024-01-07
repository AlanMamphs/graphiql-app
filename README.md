GraphiQL is a playground/IDE for graphQL requests

## Getting Started

The project is built with NodeJS version `v18.18.2`. Before installing dependencies, it is recommended to install correct Node Version. It is recommended to use [NVM](https://github.com/nvm-sh/nvm) for Node Version management.

Install all dependencies using npm command:

```bash
nvm use # Use version specified in .nvmrc
npm ci # Clean install
```

Start Development

```bash
npm run dev
```

Run tests

```bash
npm run test
npm run test:watch # Run in watch-mode
npm run test:coverage # Run in coverage mode
npm run test:coverage:ui # Run in coverage mode with UI server
```

Formatting and linting

```bash
npm run lint # Check linting
npm run lint -- --fix # Fix linting
npm run format:check # Check formatting issues
npm run format:fix # Fix formatting issues
```

## Coding Guidelines


- Write code as simply as possible: KISS
- Avoid unnecessary repetition: DRY
- Delete what is not needed: YAGNI
- Comply with [SOLID](https://en.wikipedia.org/wiki/Single_responsibility_principle)
