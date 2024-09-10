
const redisConfig = {
  prefix: 'q',
  redis: {
    port: 6379,
    host: '127.0.0.1',
    auth: '',
    options: {
      // see https://github.com/mranney/node_redis#rediscreateclient
    }
  }};

// const redisConnection = new Redis(redisConfig);

export default redisConfig