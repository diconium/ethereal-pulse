import IORedis, { RedisOptions } from "ioredis";

const redisOptions: RedisOptions = {
  maxRetriesPerRequest: null,
};

const getConnection = new IORedis(redisOptions);

export default getConnection;
