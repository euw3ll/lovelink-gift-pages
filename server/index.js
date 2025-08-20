import http from 'http';
import { readFileSync, writeFileSync } from 'fs';
import { randomUUID, createHmac, createHash } from 'crypto';
import url from 'url';

const PORT = 4000;
const SECRET = 'secret-key';

function readDB() {
  const data = readFileSync(new URL('./db.json', import.meta.url));
  return JSON.parse(data.toString());
}

function writeDB(data) {
  writeFileSync(new URL('./db.json', import.meta.url), JSON.stringify(data, null, 2));
}

function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
  return `${header}.${body}.${signature}`;
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'POST' && parsedUrl.pathname === '/api/register') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        const db = readDB();
        if (db.users.find((u) => u.email === email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'User already exists' }));
          return;
        }
        const user = {
          id: randomUUID(),
          email,
          password: createHash('sha256').update(password).digest('hex'),
        };
        db.users.push(user);
        db.subscriptions.push({ id: randomUUID(), userId: user.id, plan: 'free' });
        writeDB(db);
        const token = generateToken({ id: user.id, email: user.email });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    });
    return;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/login') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        const db = readDB();
        const user = db.users.find((u) => u.email === email);
        if (!user || user.password !== createHash('sha256').update(password).digest('hex')) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid credentials' }));
          return;
        }
        const token = generateToken({ id: user.id, email: user.email });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ token }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
