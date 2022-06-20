// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';
import { appSettings } from './app-settings';

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./global-setup'),
  use: {
    // Tell all tests to load signed-in state from 'storageState.json'.
    storageState: `./local-storage/${appSettings.app_identifier}.json`,
  },
};
export default config;
