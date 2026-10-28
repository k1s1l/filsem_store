// Налаштування магазину. Дані взято з постів каналу; порожні поля інтерфейс не показує.

export const shopConfig = {
  name: 'FILSEM',
  subtitle: 'store',
  currency: '₴',
  isDemo: false,
  contacts: {
    phone: '' as string,
    /** Менеджер для замовлень у Telegram (з постів каналу). */
    telegram: '@Filsem14' as string,
    email: '' as string,
    hours: '' as string,
  },
  /** Посилання на відгуки. Порожньо — не показується. */
  reviewsUrl: '' as string,
  /** Короткий рядок про доставку на сторінці товару (з постів каналу). */
  deliveryNote: 'В наявності в Україні, доставка 1–2 дні',
  hero: {
    eyebrow: 'Оригінал',
    title: 'Nike, Jordan, New Balance',
    text: 'Живі фото, в наявності в Україні',
    image: 'air-jordan-1-low' as string | undefined,
  },
  delivery: {
    /** Від якої суми доставка безкоштовна (для підказки в кошику). 0 — не показувати. */
    freeFrom: 0,
  },
};

/** Посилання на чат з менеджером. */
export const managerUrl = () => {
  const u = shopConfig.contacts.telegram.replace(/^@/, '');
  return u ? `https://t.me/${u}` : '';
};
