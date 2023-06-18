import { default as Redis, Cluster } from "ioredis";
import { ClusterStrategy } from "./ClusterStrategy";
import { RedisContext } from "./RedisContext";
import { RedisStrategy } from "./RedisStrategy";

const REDIS_STRATEGY = process.env.REDIS_STRATEGY;
const REDIS_HOSTS = process.env.REDIS_HOSTS || "localhost";
const REDIS_PORTS = process.env.REDIS_PORTS || "6379";


class RedisClient {

    private static instance: RedisClient;
    public client: Redis | Cluster;


    private constructor() {
        if (REDIS_STRATEGY && REDIS_STRATEGY == 'cluster') {
            interface RedisNode {
                host: string;
                port: number;
                password?: string
            }

            const redisHosts: Array<string> = REDIS_HOSTS?.split(",") ?? [''];
            const redisPorts: Array<string> = REDIS_PORTS?.split(",") ?? [''];
            const redisNodes: Array<RedisNode> = redisHosts.map((node, idx) => {
                return {
                    host: node,
                    port: parseInt(redisPorts[idx])
                }
            })
            const strategy = new ClusterStrategy(redisNodes)
            const redisContext = new RedisContext(strategy);
            const redisClient = redisContext.getClient();
            this.client = redisClient;
        }
        else {
            const strategy = new RedisStrategy({
                host: REDIS_HOSTS,
                port: parseInt(REDIS_PORTS)
            })
            const redisContext = new RedisContext(strategy);
            const redisClient = redisContext.getClient();
            this.client = redisClient;
        }
    }


    /**
 * Connect to redis client singleton
 * @returns 
 */
    public async connect(): Promise<void> {
        await this.client.quit();
        await this.client.connect();
        console.log('Redis client status: ', this.client.status);
    }

    /**
     * Get Redis Client singleton
     * @param config 
     * @returns 
     */
    public static getInstance(): RedisClient {
        if (!RedisClient.instance) {
            RedisClient.instance = new RedisClient();
        }

        return RedisClient.instance;
    }

    /**
 * Set value in key
 * @param key 
 * @param value 
 */
    public async set(key: string, value: string): Promise<void> {
        try {
            await this.client.set(key, value);
        } catch (err) {
            console.error(`Error setting item with key ${key}: ${err}`);
        }
    }

    /**
     * Get value by key
     * @param key 
     * @returns 
     */
    public async get(key: string): Promise<string | null> {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (err) {
            console.error(`Error getting item with key ${key}: ${err}`);
            return null;
        }
    }

    public async quit(): Promise<void> {
        await this.client.quit();
    }
}

export default RedisClient;