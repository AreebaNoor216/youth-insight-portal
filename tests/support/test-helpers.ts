import { Page, expect } from '@playwright/test';

export async function loginAsPresident(page: Page) {
  await page.goto('/login');
  await page.fill('#email', 'president@haripur.youthinsight.pk');
  await page.fill('#password', 'SecurePassword123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/.*\/portal\/dashboard/);
}

export async function loginAsAdmin(page: Page) {
  await page.goto('/login');
  await page.fill('#email', 'admin@youthinsight.pk');
  await page.fill('#password', 'AdminPass123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/.*\/admin/);
}
