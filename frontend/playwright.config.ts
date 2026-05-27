/* eslint-disable */
import { defineConfig } from '@playwright/test';

const config = defineConfig({
  workers: 1,
  use: {
    headless: true,
  },
});

export default config;

