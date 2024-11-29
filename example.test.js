// example.test.js
const { test, expect } = require('@playwright/test');

test('my first test', async ({ page }) => {
  // เปิดเว็บไซต์
  await page.goto('https://example.com');
  
  // ตรวจสอบว่า title ของเว็บไซต์เป็น "Example Domain"
  const title = await page.title();
  expect(title).toBe('Example Domain');
});
