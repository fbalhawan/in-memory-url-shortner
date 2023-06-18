import { Redis, RedisOptions } from 'ioredis';
import { IRedisStrategy } from './IRedis';

export class RedisStrategy implements IRedisStrategy {
    private readonly client: Redis;

    constructor(options: RedisOptions) {
        this.client = new Redis(options);
    }

    public getClient(): Redis {
        return this.client;
    }
}