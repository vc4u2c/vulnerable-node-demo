import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { catalog } from '../src/catalog.mjs';
import { createApp } from '../src/server.mjs';
test('catalog filters and sorts without changing the source', () => {
  assert.deepEqual(catalog({ category: 'office', sort: 'price' }).map(p => p.name), ['Notebook', 'Desk lamp']);
  assert.equal(catalog().length, 3);
  assert.equal(catalog({ category: 'missing' }).length, 0);
});
test('API serves health/products and rejects unknown routes and writes', async t => {
  const server = createApp().listen(0, '127.0.0.1');
  await once(server, 'listening'); t.after(() => server.close());
  const base = 'http://127.0.0.1:' + server.address().port;
  assert.deepEqual(await (await fetch(base + '/health')).json(), { status: 'ok' });
  const products = await (await fetch(base + '/api/products?sort=price')).json();
  assert.deepEqual(products.map(p => p.price), [12, 24, 45]);
  assert.equal((await fetch(base + '/missing')).status, 404);
  assert.equal((await fetch(base + '/api/products', { method: 'POST' })).status, 405);
});
