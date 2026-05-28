import { test, expect } from '@playwright/test';

test('language switch updates UI, document.lang, url and localStorage', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const nav = page.locator('nav');

  // initial language button should show 'et' by default (no saved preference, root URL)
  // select the header language button by its aria-label (translatable)
  const langButton = nav.locator('button[aria-label="Keel"]').first();
  await expect(langButton).toBeVisible();

  // open language menu and select English
  await langButton.click();
  // dropdown renders buttons with labels 'ET' and 'EN'
  const enOption = page.locator('button', { hasText: 'EN' }).first();
  await expect(enOption).toBeVisible();
  await enOption.click();

  // documentElement.lang should be updated and persisted
  const docLang = await page.evaluate(() => document.documentElement.lang);
  expect(docLang).toBe('en');

  // localStorage should persist the language
  const stored = await page.evaluate(() => localStorage.getItem('lang'));
  expect(stored).toBe('en');

  // url pathname should include /en (the app mirrors language into the URL)
  const pathname = new URL(page.url()).pathname;
  expect(pathname.startsWith('/en')).toBeTruthy();

  // some visible text should be translated (nav gallery label -> 'Gallery')
  await expect(nav).toContainText('Gallery');

  // --- switch back to Estonian (robust) ---
  // The header language button shows the current lang inside a <span>. Find
  // the button that contains that span with text 'en' so we target the header
  // control even if there are duplicate buttons elsewhere (mobile menu, etc.).
  // find the header language button by looking for a button that contains a <span>
  // (the header language control renders the current lang inside a span). This
  // avoids relying on the aria-label text or the exact code text which may be
  // transformed by CSS.
  // re-query the nav to avoid holding a reference to a possibly replaced element
  const navAfter = page.locator('nav');
  await expect(navAfter).toContainText('Gallery');

  // locate the header language button by using a CSS :has(span) selector
  const headerLangButtonEn = navAfter.locator('button:has(span)').first();
  await expect(headerLangButtonEn).toBeVisible();
  await headerLangButtonEn.click();

  // click the Estonian option from the dropdown
  const etOption = page.locator('button', { hasText: 'ET' }).first();
  await expect(etOption).toBeVisible();
  await etOption.click();

  // verify we switched back to Estonian
  expect(await page.evaluate(() => document.documentElement.lang)).toBe('et');
  expect(await page.evaluate(() => localStorage.getItem('lang'))).toBe('et');
  const pathname2 = new URL(page.url()).pathname;
  // after switching back the app removes the /en prefix
  expect(pathname2 === '/' || !pathname2.startsWith('/en')).toBeTruthy();
  await expect(nav).toContainText('Galerii');
});

