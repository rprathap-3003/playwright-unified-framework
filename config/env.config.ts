import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  apiUrl: process.env.API_URL || 'https://reqres.in/api',
  env: process.env.ENV || 'staging',
  headless: process.env.HEADLESS !== 'false',
  slowMo: Number(process.env.SLOW_MO) || 0,
  desktopAppEntry: process.env.DESKTOP_APP_ENTRY || path.resolve(__dirname, '../src/desktop-app/main.js'),
  allureResultsDir: process.env.ALLURE_RESULTS_DIR || 'allure-results',
  isCI: process.env.CI === 'true',
};
