import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('hero has preload and preload matches hero src', async ({ page }) => {
  // adjust selectors to your hero element if needed
  const hero = page.locator('img[alt*="hero"], .hero img').first();
  await expect(hero).toHaveCount(1);

  const heroSrc = await hero.getAttribute('src');
  const preload = page.locator('link[rel="preload"][as="image"]');
  await expect(preload).toHaveCount(1);

  const imagesrcset = await preload.getAttribute('imagesrcset');
  const href = await preload.getAttribute('href');
  const preloadStr = imagesrcset || href || '';
  expect(preloadStr).toContain(heroSrc?.split('/').pop()?.split('?')[0] ?? '');
});

test('gallery images are lazy and have reserved space', async ({ page }) => {
  const imgs = page.locator('main img'); // narrow selector to your gallery if needed
  const count = await imgs.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < Math.min(count, 12); i++) {
    const img = imgs.nth(i);
    await expect(img).toHaveAttribute('loading', 'lazy');

    const width = await img.getAttribute('width');
    const height = await img.getAttribute('height');
    if (width && height) {
      expect(Number(width)).toBeGreaterThan(0);
      expect(Number(height)).toBeGreaterThan(0);
    } else {
      // check parent reserves space via padding-bottom or aspect-ratio
      const parentPadding = await img.evaluate((el) => {
        const p = el.parentElement as HTMLElement;
        return getComputedStyle(p).paddingBottom || getComputedStyle(el).aspectRatio || '';
      });
      expect(parentPadding).not.toBe('');
    }
  }
});
