import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';
import minimist from 'minimist';
import { catalog } from './catalog.mjs';
export function createApp() {
  return createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'GET') { res.writeHead(405); return res.end(JSON.stringify({ error: 'Method not allowed' })); }
    if (url.pathname === '/health') return res.end(JSON.stringify({ status: 'ok' }));
    if (url.pathname === '/api/products') return res.end(JSON.stringify(catalog({ category: url.searchParams.get('category'), sort: url.searchParams.get('sort') || 'name' })));
    if (url.pathname === '/') return res.end(JSON.stringify({ app: 'Vulnerable Node demo', purpose: 'Dependency remediation training', endpoints: ['/health', '/api/products?sort=price'] }));
    res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = minimist(process.argv.slice(2), { default: { port: 3000 } });
  createApp().listen(Number(args.port), '127.0.0.1', () => console.log('Demo app: http://127.0.0.1:' + args.port));
}
