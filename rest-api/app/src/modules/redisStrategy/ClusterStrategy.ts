import { Cluster, ClusterNode, ClusterOptions, default as Redis } from 'ioredis';
import { IRedisStrategy } from './IRedis';

export class ClusterStrategy implements IRedisStrategy {
    private readonly client: Cluster;

    constructor(nodes: ClusterNode[], options?: ClusterOptions) {
        this.client = new Cluster(nodes, options);
    }

    public getClient(): Cluster {
        return this.client;
    }
}