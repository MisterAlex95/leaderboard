module.exports = require('redis').createClient({
  host: "instance_redis.redis-node",
  detect_buffers: true
});

