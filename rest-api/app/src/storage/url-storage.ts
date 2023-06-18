
import RedisClient from "../modules/redisStrategy/RedisClient";
class UrlStorage {

    constructor(){
        // this.redisClient = RedisClient.getInstance();
    }

    /**
     * Create a short URL for a provided one
     * @param url 
     * @returns 
     */
    public encode(url: string): String{
        let shortId = Math.random().toString(36).substring(2, 8);
        const redisClient = RedisClient.getInstance();
        redisClient.set(shortId, this.ensureHttp(url) );
        return shortId;
    }

    /**
     * Get full URL from short URL key
     * @param shortUrl 
     * @returns 
     */
    public async decode(shortUrl: string): Promise<string|null>{
        const redisClient = RedisClient.getInstance();
        const value = await redisClient.get(shortUrl);
        return value;
    }

    private ensureHttp(url: string): string {
        if (!/^http(s)?:\/\//i.test(url)) {
            url = 'https://' + url;
        }
        return url;
    }
}
export default UrlStorage;