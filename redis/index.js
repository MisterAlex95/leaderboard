if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') require('dotenv').config();

module.exports = require('redis').createClient({
  host: process.env.REDIS_URL || "instance_redis.redis-node",
  detect_buffers: true
});

