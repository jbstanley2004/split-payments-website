const { test, expect } = require('@playwright/test');

test('homepage', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: 'verification/homepage.png' });
});
