import { test, expect } from '@playwright/test';

test('gallery visual snapshot', async ({ page }) => {
  await page.goto('http://localhost:5173/gallery'); // change path if different
  await page.setViewportSize({ width: 1200, height: 900 });
  // Wait for the gallery grid to be present and a short extra sleep so above-
  // the-fold images finish rendering. Avoid using networkidle which can hang
  // in dev servers with persistent connections.
  await page.waitForSelector('div.columns-1');
  await page.waitForTimeout(1200);
  const shot = await page.screenshot({ fullPage: true });
  expect(shot).toMatchSnapshot('gallery-baseline.png');
});
