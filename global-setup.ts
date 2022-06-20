import { chromium, FullConfig, expect } from '@playwright/test';
import { appSettings } from './app-settings';

async function globalSetup(config: FullConfig) {
  console.log('launching headless browser to login');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`https://${appSettings.app_identifier}.betty.app/login`);
  await page.fill('input[type="email"]', appSettings.webuser.username);
  await page.fill('input[type="password"]', appSettings.webuser.password);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4000);
  await page.context().storageState({
    path: `./local-storage/${appSettings.app_identifier}.json`,
  });
  await browser.close();
  console.log('Done, validate local-storage folder if not logged in correctly');
}

export default globalSetup;
