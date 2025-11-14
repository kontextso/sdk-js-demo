// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const server = createServer(async (req, res) => {
  try {
    const filePath = join(__dirname, 'public', 'index.html');
    const data = await readFile(filePath);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error\n');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on http://127.0.0.1:3000');
});
