import { defineConfig } from '@playwright/test';
import 'dotenv/config'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // retries: 1,
  reporter: [['html'], ['list']],
  use: {
    baseURL: process.env.BASE_URL,
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
});