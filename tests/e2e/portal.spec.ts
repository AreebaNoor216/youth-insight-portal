import { test, expect } from '@playwright/test';

test.describe('Youth Insight Portal - Animation & Flow Validation', () => {
  
  test('Public chapter directory loads and animates smoothly', async ({ page }) => {
    await page.goto('/chapters');
    
    // Assert initial state of search grid
    const searchInput = page.locator('input[name="chapter-search"]');
    await expect(searchInput).toBeVisible();

    // Trigger filter animation
    await searchInput.fill('Haripur');
    
    // Verify transition card wrapper handles opacity/transform changes correctly
    const cardWrapper = page.locator('.chapter-card-animated').first();
    await expect(cardWrapper).toHaveClass(/transition-all/);
    
    // Wait for frame rendering completion to ensure animations finish cleanly
    await page.waitForFunction(() => {
      const el = document.querySelector('.chapter-card-animated');
      return el && window.getComputedStyle(el).opacity === '1';
    });
  });

  test('President portal secure login and report form submission', async ({ page }) => {
    await page.goto('/login');
    await page.fill('#email', 'president@haripur.youthinsight.pk');
    await page.fill('#password', 'SecurePassword123!');
    await page.click('button[type="submit"]');

    // Verify redirect to dashboard
    await expect(page).toHaveURL(/.*\/portal\/dashboard/);
    
    // Navigate to monthly report wizard
    await page.click('text=Submit Monthly Report');
    await expect(page.locator('h2')).toHaveText('Activity Report Wizard');
  });

  test('Chapter profile details and cabinet chart navigation', async ({ page }) => {
    await page.goto('/chapters/haripur');
    await expect(page.locator('h1')).toContainText('Youth Insight Haripur Chapter');
    await expect(page.getByText('Chapter President', { exact: false }).first()).toBeVisible();
  });

  test('Events catalog and RSVP delegate pass modal generation', async ({ page }) => {
    await page.goto('/events');
    const rsvpBtn = page.getByRole('button', { name: /RSVP & Pass/i }).first();
    await expect(rsvpBtn).toBeVisible();
    await rsvpBtn.click();

    // Verify modal appears
    await expect(page.getByText('Registration Pass')).toBeVisible();
  });
});
