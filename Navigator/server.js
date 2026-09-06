import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_PORT = parseInt(process.env.PORT || process.argv.find(a => /^\d+$/.test(a)) || 8003, 10);
const DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.mjs': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        addresses.push({
          name,
          address: net.address,
          isWifi: /wi-?fi|wlan|wireless/i.test(name)
        });
      }
    }
  }
  // Sort Wi-Fi adapters first
  addresses.sort((a, b) => (b.isWifi ? 1 : 0) - (a.isWifi ? 1 : 0));
  return addresses;
}

const server = http.createServer((req, res) => {
  let reqPath = (req.url || '/').split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(DIR, reqPath);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      });
      res.end('404 Not Found: ' + reqPath);
      return;
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function startServer(port) {
  server.listen(port, '0.0.0.0', () => {
    const ips = getLocalIpAddresses();
    const primaryIp = ips.length > 0 ? ips[0].address : '127.0.0.1';

    console.log('=============================================================');
    console.log('       NAVIGATOR TOOLS SANDBOX SERVER (PORT ' + port + ')');
    console.log('=============================================================');
    console.log('');
    console.log('  On this computer:');
    console.log('    http://localhost:' + port);
    console.log('');
    console.log('  On your phone (same Wi-Fi):');
    console.log('    http://' + primaryIp + ':' + port);
    console.log('');
    if (ips.length > 1) {
      console.log('  Additional network adapters:');
      for (let i = 1; i < ips.length; i++) {
        console.log('    http://' + ips[i].address + ':' + port + ' (' + ips[i].name + ')');
      }
      console.log('');
    }
    console.log('  Folder path:');
    console.log('    ' + DIR);
    console.log('');
    console.log('  Tip: If your phone cannot connect, allow Node through Windows Firewall.');
    console.log('-------------------------------------------------------------');
    console.log('  Press Ctrl+C to stop the server.');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn('Port ' + port + ' is in use. Trying port ' + (port + 1) + '...');
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(DEFAULT_PORT);
