const { redis } = require('../config/redis');

async function cacheGet(key) {
  if (!redis) return null;
  return redis.get(key);
}

async function cacheSet(key, value, ttlSeconds) {
  if (!redis) return null;

  if (ttlSeconds) {
    return redis.set(key, value, { ex: ttlSeconds });
  }

  return redis.set(key, value);
}

async function cacheDelete(key) {
  if (!redis) return null;
  return redis.del(key);
}

async function cacheDeletePattern() {
  return null;
}

module.exports = {
  cacheGet,
  cacheSet,
  cacheDelete,
  cacheDeletePattern,
};
