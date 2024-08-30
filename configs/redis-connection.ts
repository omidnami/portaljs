const Redis = require('ioredis');

const redisConfig = {
  port: 6379,
  host: '127.0.0.1',
};

const redisConnection = new Redis(redisConfig);

export default redisConnection