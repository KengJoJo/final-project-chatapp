// playwright.test.js
const { test, expect } = require('@playwright/test');

test('my first test', async ({ page }) => {
  await page.goto('http://localhost:3000');  // ใช้ URL ที่แอป React ของคุณรันอยู่
  const title = await page.title();
  expect(title).toBe('React App');
});
