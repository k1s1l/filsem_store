// КАТАЛОГ — перенесено з постів Telegram-каналу filsem_store (28.10.2026).
// Беремо лише те, що написано в постах і видно на фото. Чого немає — не вигадуємо.

import type { OptionGroup, Product } from '../types';

/** Розміри з поста. Підпис може містити довжину устілки, напр. ['44.5', '28.5 см']. */
const sizes = (values: (string | [string, string])[], label = 'Розмір'): OptionGroup => ({
  id: 'size',
  label,
  values: values.map((v) => {
    const [id, note] = Array.isArray(v) ? v : [v, ''];
    return { id, label: note ? `${id} · ${note}` : id, available: true };
  }),
});

const ORIGINAL = { label: 'Оригінальність', value: 'Оригінал (за словами продавця)' };
const IN_UA = { label: 'Наявність', value: 'В Україні, доставка 1–2 дні' };

type Draft = Omit<Product, 'popularity' | 'stock' | 'tags'> & Partial<Pick<Product, 'stock' | 'tags'>>;
const item = (p: Draft): Product => ({ stock: 'in_stock', tags: [], popularity: 0, ...p });

export const catalogProducts: Product[] = [
  item({
    id: 'nike-acg-vest',
    categoryId: 'clothing',
    subcategoryIds: ['vests'],
    brand: 'Nike ACG',
    name: 'Жилетка Nike ACG Lava Flow',
    shortDescription: 'Преміальна модель, якісні матеріали',
    description:
      'Преміальна річ, дорога модель, якої в Україні ще немає. Дуже приємні та якісні матеріали — ідеальний варіант на осінь.',
    price: 4499,
    images: ['nike-acg-vest'],
    attributes: [ORIGINAL, IN_UA],
    options: [sizes(['M', 'L'])],
    addedAt: '2026-10-28T19:01',
  }),
  item({
    id: 'nike-puffer-650-vest',
    categoryId: 'clothing',
    subcategoryIds: ['vests'],
    brand: 'Nike',
    name: 'Жилетка Nike Puffer 650',
    shortDescription: 'Щільна набивка, гарний варіант на осінь',
    description: 'Дорога та якісна модель зі щільною набивкою — дуже гарний варіант на осінь.',
    price: 4499,
    images: ['nike-puffer-vest'],
    attributes: [ORIGINAL, IN_UA],
    options: [sizes(['M'])],
    addedAt: '2026-10-28T19:06',
  }),
  item({
    id: 'air-jordan-1-low-se',
    categoryId: 'sneakers',
    subcategoryIds: [],
    brand: 'Jordan',
    name: 'Кросівки Air Jordan 1 Low SE',
    shortDescription: 'Преміальна пара, приємні на дотик матеріали',
    description: 'Преміальна пара, виконана з якісних матеріалів, дуже приємна на дотик.',
    price: 3899,
    images: ['air-jordan-1-low'],
    attributes: [ORIGINAL, IN_UA],
    options: [sizes([['44.5', '28.5 см']])],
    addedAt: '2026-10-28T19:15',
  }),
  item({
    // Два пости з однаковою назвою — дві різні пари. Фото зіставлено за порядком постів.
    id: 'nb-1906-primaloft-1',
    categoryId: 'sneakers',
    subcategoryIds: ['winter'],
    brand: 'New Balance',
    name: 'Кросівки New Balance 1906 Primaloft (графітові)',
    shortDescription: 'Утеплювач Primaloft, щільний верх — на зиму',
    description:
      'Легендарна пара зі щільним, цупким матеріалом верху на утеплювачі Primaloft — ідеальний варіант на зиму.',
    price: 4999,
    images: ['nb-1906-black'],
    attributes: [{ label: 'Утеплювач', value: 'Primaloft' }, ORIGINAL, IN_UA],
    options: [sizes([['41.5', '26 см'], ['42', '26.5 см']])],
    addedAt: '2026-10-28T19:27',
  }),
  item({
    id: 'nb-1906-primaloft-2',
    categoryId: 'sneakers',
    subcategoryIds: ['winter'],
    brand: 'New Balance',
    name: 'Кросівки New Balance 1906 Primaloft (чорні)',
    shortDescription: 'Утеплювач Primaloft, щільний верх — на зиму',
    description:
      'Легендарна пара зі щільним, цупким матеріалом верху на утеплювачі Primaloft — ідеальний варіант на зиму.',
    price: 4999,
    images: ['nb-1906-black-2'],
    attributes: [{ label: 'Утеплювач', value: 'Primaloft' }, ORIGINAL, IN_UA],
    options: [sizes([['41.5', '26 см']])],
    addedAt: '2026-10-28T19:35',
  }),
  item({
    id: 'nb-1906-cordura',
    categoryId: 'sneakers',
    subcategoryIds: [],
    brand: 'New Balance',
    name: 'Кросівки New Balance 1906 Cordura',
    shortDescription: 'Верх Cordura — не бояться вітру й дощу',
    description: 'Дорога модель зі щільним, цупким матеріалом верху Cordura — не бояться вітру та дощу.',
    price: 4999,
    images: ['nb-1906-brown'],
    attributes: [{ label: 'Матеріал верху', value: 'Cordura' }, ORIGINAL, IN_UA],
    options: [sizes([['40', '25 см'], ['42', '26.5 см']])],
    addedAt: '2026-10-28T19:44',
  }),
  item({
    id: 'nike-tech-fleece-zip',
    categoryId: 'clothing',
    subcategoryIds: ['hoodies'],
    brand: 'Nike',
    name: 'Зіпка Nike Tech Fleece',
    shortDescription: 'Остання колекція, найпопулярніший колір',
    description: 'Остання колекція — всіма улюблений Tech Fleece у найпопулярнішому кольорі.',
    price: 3999,
    images: ['nike-tech-fleece-hoodie'],
    attributes: [ORIGINAL, IN_UA],
    options: [sizes(['S', 'M'])],
    tags: ['new'],
    addedAt: '2026-10-28T20:11',
  }),
  item({
    id: 'nike-tech-fleece-open-hem',
    categoryId: 'clothing',
    subcategoryIds: ['pants'],
    brand: 'Nike',
    name: 'Штани Nike Tech Fleece Open Hem',
    shortDescription: 'Преміальна модель, яку важко знайти',
    description: 'Дорога та преміальна модель — у нас такі дуже важко знайти.',
    price: 3599,
    images: ['nike-tech-fleece-pants'],
    attributes: [{ label: 'Посадка', value: 'Oversize, розмір S може підійти на M' }, ORIGINAL, IN_UA],
    options: [sizes(['S'])],
    addedAt: '2026-10-28T20:19',
  }),
  item({
    id: 'nike-tech-fleece-nocta-crew',
    categoryId: 'clothing',
    subcategoryIds: ['hoodies'],
    brand: 'Nike × NOCTA',
    name: 'Світшот Nike Tech Fleece × NOCTA',
    shortDescription: 'Рідкісна річ, дуже гарний колір',
    description: 'Дорога та дуже рідкісна річ, максимально гарний колір.',
    price: 3499,
    images: ['nike-nocta-crewneck'],
    attributes: [ORIGINAL, IN_UA],
    options: [sizes(['M'])],
    addedAt: '2026-10-28T20:29',
  }),
  item({
    id: 'nike-tech-woven-pants',
    categoryId: 'clothing',
    subcategoryIds: ['pants'],
    brand: 'Nike',
    name: 'Штани Nike Tech Woven',
    shortDescription: 'Тонкий приємний матеріал, на осінь',
    description: 'Найпопулярніша модель: тонкий та приємний матеріал — ідеальний варіант на осінь.',
    price: 3199,
    images: ['nike-woven-pants'],
    attributes: [ORIGINAL, IN_UA],
    options: [sizes(['S'])],
    addedAt: '2026-10-28T20:48',
  }),
];
