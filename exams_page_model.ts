import { expect, chromium, FullConfig, Locator, Page } from '@playwright/test';
import Chance from 'chance';
import axios from 'axios';
import { appSettings } from './app-settings';

const chance = new Chance();

export class FakePerson {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;

  constructor() {
    this.firstName = chance.first();
    this.lastName = chance.last();
    this.email = chance.email();
    this.password = 'Ikwilerin123!';
  }
}

type Operators = 'eq' | 'gt' | 'gte' | 'lt' | 'lte';

export class ExamUtils {
  //selectors here
  constructor(page: Page) {
    //selectors also here
  }

  async goto(page: Page, path: string) {
    await page.goto(`https://${appSettings.app_identifier}.betty.app${path}`);
    await page.waitForLoadState('networkidle');
  }

  async datatableHasResults(
    page: Page,
    selector: string,
    amountResults = 1,
    operator: Operators = 'eq',
  ) {
    const tr_count = await page
      .locator(`[data-exam-component="${selector}"] >> table >> tbody >> tr`)
      .count();

    switch (operator) {
      case 'eq':
        expect(tr_count).toEqual(amountResults);
        break;

      case 'gt':
        expect(tr_count).toBeGreaterThan(amountResults);
        break;
      case 'gte':
        expect(tr_count).toBeGreaterThanOrEqual(amountResults);
        break;
      case 'lt':
        expect(tr_count).toBeLessThan(amountResults);
        break;
      case 'lte':
        expect(tr_count).toBeLessThanOrEqual(amountResults);
        break;
    }
    return tr_count;
  }

  async datatableSort(page: Page, selector: string) {
    const sort_button = page
      .locator(`[data-exam-component="${selector}"] >> thead >> tr`)
      .first()
      .locator('svg')
      .first();
    await sort_button.click();
    expect(sort_button).toBeVisible;
  }

  async clickButton(page: Page, selector = 'details') {
    const button = page.locator(`text=/${selector}/i`).first();
    await button.click();
    await page.waitForTimeout(3000);
  }

  async datatableFilter(page: Page, selector: string) {
    const searchField = page
      .locator(
        `[data-exam-component="${selector}"] > div > div > div > div > input`,
      )
      .first();
    const randomString = chance.string({ length: 20 });
    await searchField.fill(randomString);
    await page.waitForTimeout(2000);
    await this.datatableHasResults(page, selector, 0);
  }

  async requestCompleted(
    page: Page,
    responseUrlContains = '/api/runtime/',
    responseContainsProperty = 'actionb5',
  ) {
    const response = await page.waitForResponse(
      (response) =>
        response.url().includes(responseUrlContains) &&
        response.status() === 200,
    );
    const response_body = await response.json();
    expect(response_body.data).toHaveProperty(responseContainsProperty);
  }

  async parentSelector(page: Page, selector: string) {
    const element = await page.$(`[data-exam-component="${selector}"]`);
    return await element.$('xpath=parent::node()');
  }
}

export class ExamPage {
  //selectors here
  constructor(page: Page) {
    //selectors also here
  }
}
