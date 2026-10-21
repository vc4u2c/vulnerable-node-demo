import lodash from 'lodash';
const products = [
  { id: 1, name: 'Desk lamp', category: 'Office', price: 45 },
  { id: 2, name: 'Notebook', category: 'Office', price: 12 },
  { id: 3, name: 'Travel mug', category: 'Kitchen', price: 24 },
];
export function catalog({ category, sort = 'name' } = {}) {
  const filtered = category ? products.filter(p => p.category.toLowerCase() === category.toLowerCase()) : products;
  return lodash.sortBy(filtered, ['name', 'price'].includes(sort) ? sort : 'name');
}
