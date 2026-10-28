import type { Category } from './types';

// Категорії магазину. Порожні категорії й підкатегорії приховуються автоматично,
// тож сюди можна заздалегідь додати ті, товари для яких з'являться пізніше.
export const categories: Category[] = [
  {
    id: 'sneakers',
    name: 'Кросівки',
    tagline: 'Jordan, New Balance',
    image: '',
    filterOptions: ['size'],
    subcategories: [
      { id: 'winter', name: 'Утеплені' },
      { id: 'new', name: 'Новинки', byTag: 'new' },
    ],
  },
  {
    id: 'clothing',
    name: 'Одяг',
    tagline: 'Nike Tech Fleece, ACG, NOCTA',
    image: '',
    filterOptions: ['size'],
    subcategories: [
      { id: 'vests', name: 'Жилетки' },
      { id: 'hoodies', name: 'Зіпки та світшоти' },
      { id: 'pants', name: 'Штани' },
    ],
  },
  {
    id: 'accessories',
    name: 'Аксесуари',
    tagline: 'Сумки, кепки та інше',
    image: '',
    filterOptions: [],
    subcategories: [],
  },
];
