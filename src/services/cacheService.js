const Redis = require("ioredis");
const logger = require("../utils/logger");

class CacheService {
    constructor() {
        this.redis = new Redis(
           {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD
           }
        );

        this.redis.on("error", (error) => {
            logger.error(`Error connecting to Redis: ${error}`);
        });
    }

    async set(key, value, expiration = 3600) {
        try{
            const serializedValue = JSON.stringify(value);
            await this.redis.setex(key, expiration, serializedValue);
            logger.info(`Set key ${key} in Redis with expiration ${expiration}`);  
        } catch (error) {
            logger.error(`Error setting key ${key} in Redis: ${error}`);
            throw error;
        }
    }       

    async get(key) {
        try{
            const value = await this.redis.get(key);
            return JSON.parse(value);
        } catch (error) {
            logger.error(`Error getting key ${key} from Redis: ${error}`);
            throw error;
        }
    }

    async delete(key) {
        try{
            await this.redis.del(key);
            logger.info(`Deleted key ${key} from Redis`);
        } catch (error) {
            logger.error(`Error deleting key ${key} from Redis: ${error}`);
            throw error;
        }
    }
}

module.exports = CacheService;