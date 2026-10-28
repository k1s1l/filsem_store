# FILSEM store — Telegram Mini App

Магазин каналу filsem_store у вигляді Telegram Mini App: кросівки та одяг (Nike, Jordan, New Balance)
з живими фото, цінами й розмірами. Інтерфейс українською, валюта — гривня.

Каталог перенесено з постів каналу (`src/data/catalog/products.ts`). Оформлення замовлення поки
демонстраційне: заявка нікуди не надсилається, оплата не списується.

## Запуск

```bash
npm install
npm run dev     # розробка, http://localhost:5173
npm run build   # збірка в dist/
npm start       # сервер + бот (PORT, BOT_TOKEN зі змінних середовища)
```

Перевірка: `npm run build && PORT=4173 node server.mjs &` і `node scripts/smoke-test.cjs`.

## Railway

1. **New Project → Deploy from GitHub repo** → цей репозиторій (налаштування в `railway.json`).
2. **Variables:** `BOT_TOKEN` — токен бота з @BotFather (лише тут, ніколи в коді).
3. **Settings → Networking → Generate Domain**, порт `8080`, потім **Redeploy**.
4. У логах має з'явитися `Бот: @… запущено, магазин https://…`.

Бот відповідає на `/start` кнопкою «Відкрити магазин» і сам ставить кнопку меню.

## Як оновити каталог

- Товари: `src/data/catalog/products.ts` (назва, ціна, розміри, опис, фото).
- Фото: `python3 -I scripts/prepare-catalog-photo.py <фото> <id-товару>` → `src/assets/catalog/<id>.jpg`.
  Кілька фото одного товару: `<id>-2`, `<id>-3` і додати їх у `images`.
- Назва, контакт менеджера, банер, рядок про доставку: `src/config/shop.ts`.
- Категорії без товарів приховуються автоматично.

## Безпека

Сервер (`server.mjs`) без сторонніх залежностей, із заголовками безпеки (CSP, HSTS, nosniff),
захистом від виходу за межі `dist/` і лише GET/HEAD-запитами. Токен бота використовується тільки
на сервері й не потрапляє ні в браузер, ні в логи.
