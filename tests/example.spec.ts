import test, { expect } from '@playwright/test';
import { Chance } from 'chance';
import { ExamUtils } from '../page-models/exams';

const chance = new Chance();

test.describe('Automated testing app', async () => {
  test('As a web user, I am able to login to the front-end', async ({
    page,
  }) => {
    const examUtils = new ExamUtils(page);
    await examUtils.goto(page, '/dashboard');
    await page.waitForTimeout(500);
    expect(page.url()).toMatch('/dashboard');
  });
});
