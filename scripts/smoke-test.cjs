// Наскрізна перевірка основних сценаріїв у мобільному вікні.
// Запуск: npm run build && PORT=4173 node server.mjs &  node scripts/smoke-test.cjs [теку-для-скріншотів]
const { chromium } = require('playwright');
const fs = require('fs');

const URL = process.env.APP_URL || 'http://localhost:4173/';
const OUT = process.argv[2] || 'smoke-shots';
fs.mkdirSync(OUT, { recursive: true });

const results = [];
const check = (name, ok, extra = '') => {
  results.push({ name, ok });
  console.log(`${ok ? '✔' : '✘'} ${name}${extra ? ' — ' + extra : ''}`);
};
const num = (t) => parseInt(String(t).replace(/\D/g, ''), 10);

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  const errors = [];
  const ignore = /fonts\.(googleapis|gstatic)/;
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && !ignore.test(m.text()) && errors.push(m.text()));
  page.on('requestfailed', (r) => !ignore.test(r.url()) && errors.push('requestfailed ' + r.url()));

  const shot = (n) => page.screenshot({ path: `${OUT}/${n}.png` });
  const nav = (label) => page.locator('.bottom-nav .bn-item', { hasText: label }).click();
  const settle = () => page.waitForTimeout(450);

  await page.goto(URL);
  await page.waitForSelector('.hero');
  await settle();
  check('Головна відкривається', await page.locator('.logo-mark', { hasText: 'FILSEM' }).isVisible());
  await shot('01-home');

  await nav('Каталог');
  await page.waitForSelector('.catalog-cat');
  const cats = await page.locator('.catalog-cat h2').allTextContents();
  check('Лише категорії з товарами', cats.join(',') === 'Кросівки,Одяг', cats.join(', '));
  await page.locator('.catalog-cat-head', { hasText: 'Одяг' }).click();
  await page.waitForSelector('.grid .card');
  check('Одяг: 6 товарів', (await page.locator('.grid .card').count()) === 6);
  await page.locator('.sub-chips-scroll .chip', { hasText: 'Штани' }).click();
  check('Підкатегорія «Штани»', (await page.locator('.grid .card').count()) === 2);
  await settle();
  await shot('02-category');

  // Кросівки, вибір розміру
  await nav('Каталог');
  await page.locator('.catalog-cat-head', { hasText: 'Кросівки' }).click();
  await page.locator('.grid .card-name', { hasText: 'Cordura' }).click();
  await page.waitForSelector('.pd-title');
  check('Ціна з поста', num(await page.locator('.pd-price-row .price-now').textContent()) === 4999);
  check('Доставка з поста', await page.locator('.pd-perks', { hasText: 'доставка 1–2 дні' }).isVisible());
  check('Менеджер з поста', await page.locator('.pd-perks a', { hasText: '@Filsem14' }).isVisible());
  await page.locator('.buy-bar .btn-primary').click();
  check('Без розміру не додається', (await page.locator('.toast').textContent()).includes('Оберіть'));
  await page.locator('.opt', { hasText: '42' }).click();
  await settle();
  await shot('03-product');
  await page.locator('.buy-bar .btn-primary').click();
  check('Додано в кошик', (await page.locator('.toast').textContent()).includes('Додано'));

  // Товар з одним розміром — додається одразу з картки
  await page.locator('.pd-float .icon-btn').first().click();
  await page.locator('.grid .card', { hasText: 'Air Jordan' }).locator('.cart-btn').click();

  // Пошук
  await nav('Головна');
  await page.locator('.search-field').click();
  await page.fill('#search-query', 'tech fleece');
  await page.waitForTimeout(400);
  check('Пошук «tech fleece»', (await page.locator('.grid .card').count()) === 3);

  // Кошик і оформлення
  await page.locator('.search-bar .icon-btn').first().click();
  await nav('Кошик');
  await page.waitForSelector('.cart-row');
  const sum = num(await page.locator('.summary-total span').last().textContent());
  check('Сума в кошику', sum === 4999 + 3899, `${sum}`);
  await shot('04-cart');
  await page.locator('.buy-bar .btn-primary', { hasText: 'Оформити' }).click();
  await page.locator('button[type=submit]').click();
  check('Перевірка полів', (await page.locator('.field-error').count()) === 4);
  await page.fill('#co-fullName', 'Олена Коваль');
  await page.fill('#co-phone', '0671234567');
  await page.fill('#co-city', 'Київ');
  await page.fill('#co-point', 'Відділення №12');
  await page.locator('button[type=submit]').click();
  await page.waitForSelector('.success', { timeout: 5000 });
  check('Оформлення працює', true);

  await page.locator('.success .btn-primary').click();
  await nav('Профіль');
  check('Контакт менеджера в профілі', await page.locator('.contact-list a', { hasText: '@Filsem14' }).isVisible());

  await nav('Головна');
  check('Немає горизонтальної прокрутки', !(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)));
  check('Немає російських літер', (await page.evaluate(() => (document.body.innerText.match(/[ыэъё]/gi) || []).length)) === 0);
  const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
  check('Усі фото завантажились', broken === 0);
  check('Без помилок у консолі', errors.length === 0, errors.slice(0, 5).join(' | '));

  await browser.close();
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} перевірок пройдено`);
  process.exit(failed ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
