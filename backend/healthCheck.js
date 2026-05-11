const fs = require('fs');
const path = require('path');
const dns = require('dns').promises;
const net = require('net');

let envLoaded = false;

function loadEnvFromFileIfNeeded() {
  if (envLoaded) return;
  envLoaded = true;

  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    if (!key || process.env[key] !== undefined) continue;

    let value = line.slice(eqIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function withTimeout(promise, ms, timeoutMessage = 'Operation timed out') {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(timeoutMessage)), ms);
    }),
  ]);
}

function tcpCheck(host, port, timeoutMs = 3000) {
  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host, port: Number(port) });
    const onError = (err) => {
      socket.destroy();
      reject(err);
    };

    socket.setTimeout(timeoutMs, () => onError(new Error('TCP timeout')));
    socket.once('error', onError);
    socket.once('connect', () => {
      socket.end();
      resolve();
    });
  });
}

async function checkDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return { status: 'down', reason: 'DATABASE_URL is missing' };
  }

  try {
    const parsed = new URL(databaseUrl);
    const host = parsed.hostname;
    const port = parsed.port || 5432;

    await withTimeout(dns.lookup(host), 3000, 'DNS lookup timeout');
    await tcpCheck(host, port, 3500);

    return {
      status: 'up',
      host,
      port: Number(port),
      check: 'dns+tcp',
    };
  } catch (error) {
    return { status: 'down', reason: error.message };
  }
}

async function checkUpstash() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return { status: 'down', reason: 'UPSTASH_REDIS_REST_URL or token is missing' };
  }

  try {
    const target = `${url.replace(/\/$/, '')}/ping`;
    const response = await withTimeout(
      fetch(target, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }),
      4000,
      'Upstash request timeout'
    );

    const bodyText = await response.text();
    const isOk =
      response.ok &&
      (bodyText.toLowerCase().includes('pong') || bodyText.toLowerCase().includes('ok'));

    if (!isOk) {
      return {
        status: 'down',
        reason: `Unexpected response (${response.status})`,
      };
    }

    return {
      status: 'up',
      endpoint: new URL(url).hostname,
      httpStatus: response.status,
      tokenConfigured: true,
    };
  } catch (error) {
    return { status: 'down', reason: error.message };
  }
}

async function checkStorage() {
  const endpoint = process.env.STORAGE_S3_ENDPOINT;
  const bucket = process.env.STORAGE_BUCKET_NAME;
  const region = process.env.STORAGE_S3_REGION;
  const accessKeyId = process.env.STORAGE_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.STORAGE_S3_SECRET_ACCESS_KEY;
  const publicBaseUrl = process.env.STORAGE_S3_PUBLIC_BASE_URL;

  const missingVars = [];
  if (!endpoint) missingVars.push('STORAGE_S3_ENDPOINT');
  if (!bucket) missingVars.push('STORAGE_BUCKET_NAME');
  if (!region) missingVars.push('STORAGE_S3_REGION');
  if (!accessKeyId) missingVars.push('STORAGE_S3_ACCESS_KEY_ID');
  if (!secretAccessKey) missingVars.push('STORAGE_S3_SECRET_ACCESS_KEY');

  if (missingVars.length > 0) {
    return {
      status: 'down',
      reason: `Missing env vars: ${missingVars.join(', ')}`,
    };
  }

  try {
    const endpointUrl = new URL(endpoint);
    const host = endpointUrl.hostname;
    const port = endpointUrl.port || 443;
    await withTimeout(dns.lookup(host), 3000, 'DNS lookup timeout');
    await tcpCheck(host, port, 3500);

    if (publicBaseUrl) {
      let publicUrl;
      try {
        publicUrl = new URL(publicBaseUrl);
      } catch (error) {
        return { status: 'down', reason: `Invalid STORAGE_S3_PUBLIC_BASE_URL: ${error.message}` };
      }

      let response = await withTimeout(
        fetch(publicUrl.toString(), { method: 'HEAD' }),
        4000,
        'Storage request timeout'
      );
      if (response.status === 405) {
        response = await withTimeout(
          fetch(publicUrl.toString(), { method: 'GET' }),
          4000,
          'Storage request timeout'
        );
      }

      // Any non-5xx response means endpoint is reachable/auth layer is alive.
      if (response.status >= 500) {
        return { status: 'down', reason: `Storage HTTP check failed (${response.status})` };
      }
      return {
        status: 'up',
        host,
        bucket,
        region,
        publicCheckStatus: response.status,
        credentialsConfigured: true,
      };
    }

    return {
      status: 'up',
      host,
      bucket,
      region,
      check: 'dns+tcp',
      credentialsConfigured: true,
    };
  } catch (error) {
    return { status: 'down', reason: error.message };
  }
}

async function getHealthReport() {
  loadEnvFromFileIfNeeded();

  const [database, upstash, storage] = await Promise.all([
    checkDatabase(),
    checkUpstash(),
    checkStorage(),
  ]);

  const services = {
    server: {
      status: 'up',
      uptimeSec: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    },
    database,
    upstash,
    storage,
  };

  const isAllUp = Object.values(services).every((service) => service.status === 'up');

  return {
    status: isAllUp ? 'ok' : 'degraded',
    services,
  };
}

module.exports = { getHealthReport };
