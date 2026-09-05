import os from 'node:os';
import { createServer } from 'vite';

const requestedPort = 3005;

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({
          name,
          address: iface.address,
          isWifi: name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wlan') || name.toLowerCase().includes('wireless'),
        });
      }
    }
  }

  addresses.sort((a, b) => (b.isWifi ? 1 : 0) - (a.isWifi ? 1 : 0));
  return addresses;
}

async function startSandboxServer() {
  try {
    const server = await createServer({
      configFile: './vite.config.ts',
      server: {
        host: '0.0.0.0',
        port: requestedPort,
        cors: true,
      },
    });

    await server.listen();

    const actualPort = server.config.server.port || requestedPort;
    const localIps = getLocalIpAddresses();
    const primaryIp = localIps.length > 0 ? localIps[0].address : 'localhost';
    const sandboxUrl = `http://${primaryIp}:${actualPort}/?sandbox=true`;
    const localUrl = `http://localhost:${actualPort}/?sandbox=true`;

    console.log(`\n🚀 NAVIGATOR SANDBOX SERVER RUNNING:`);
    console.log(`  ➜ Local URL:   ${localUrl}`);
    console.log(`  ➜ Network URL: ${sandboxUrl}\n`);

    // Keep process alive indefinitely
    setInterval(() => {}, 1 << 30);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startSandboxServer();
