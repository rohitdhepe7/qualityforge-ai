import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const base = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.DEMO_PORT || 4173);
const resources = new Map([['/', ['index.html','text/html; charset=utf-8']], ['/app.js',['app.js','text/javascript; charset=utf-8']]]);
const server = createServer(async (req,res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname;
  if (pathname === '/api/health') {
    res.writeHead(200, {'content-type':'application/json; charset=utf-8','cache-control':'no-store'});
    res.end(JSON.stringify({status:'ok',service:'qualityforge-demo'}));return;
  }
  const resource=resources.get(pathname);
  if (!resource) {res.writeHead(404,{'content-type':'text/plain'});res.end('Not found');return;}
  try {const body=await readFile(join(base,resource[0]));res.writeHead(200,{'content-type':resource[1],'cache-control':'no-store'});res.end(body);}
  catch {res.writeHead(500);res.end('Internal server error');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Demo app: http://127.0.0.1:${port}`));
