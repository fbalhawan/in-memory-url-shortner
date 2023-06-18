import { Cluster, default as Redis } from "ioredis";
import { IRedisStrategy } from "./IRedis";
export class RedisContext {
    private strategy: IRedisStrategy;

    constructor(strategy: IRedisStrategy) {
        this.strategy = strategy;
    }

    public getClient(): Redis | Cluster {
        return this.strategy.getClient();
    }
}