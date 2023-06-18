import { Cluster, default as Redis } from 'ioredis';

export interface IRedisStrategy {
    getClient(): Redis | Cluster;
}