import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config({
  path: `.env`,
});
dotenv.config({
  path: `.env.local`,
  override: true,
});

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: ['cypress/**/*.*', 'node_modules/**'],
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
    env: {
      TEST_USER_EMAIL: 'jane.doe@example.com',
      TEST_USER_PASSWORD: 'To$9To$9',
    },
  },
  defaultCommandTimeout: 30000,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
