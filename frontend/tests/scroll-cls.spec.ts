import { test, expect } from '@playwright/test';

test('measure CLS while scrolling the gallery', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.evaluate(() => {
    (window as any).__cls__ = 0;
    try {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any) {
          if (!entry.hadRecentInput) (window as any).__cls__ += entry.value;
        }
      });
      po.observe({ type: 'layout-shift', buffered: true });
    } catch (e) { /* not supported */ }
  });

  // scroll incrementally to trigger lazy loads
  for (let y = 0; y <= 1600; y += 200) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'smooth' }), y);
    await page.waitForTimeout(200);
  }

  const cls = await page.evaluate(() => (window as any).__cls__ || 0);
  console.log('Measured CLS:', cls);
  expect(cls).toBeLessThan(0.1); // adjust threshold if you have very tall images
});
