import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import routes  from './routes';
import RedisClient   from './modules/redisStrategy/RedisClient'; 
// import { RedisStrategy } from './modules/redisStrategy/RedisStrategy';
// import { ClusterStrategy } from './modules/redisStrategy/ClusterStrategy';
// import { RedisContext } from './modules/redisStrategy/RedisContext';
import morgan from 'morgan';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_HOSTS = process.env.REDIS_HOSTS || "localhost";
const REDIS_PORTS = process.env.REDIS_PORTS || "6379";
const MORGAN_LOG = process.env.MORGAN_LOG || 'dev';
const REDIS_STRATEGY = process.env.REDIS_STRATEGY;
app.use(express.json());
app.use(morgan(MORGAN_LOG));

app.use('/api', routes);

const redisClient = RedisClient.getInstance();

redisClient.connect();

redisClient.client.once("connect", () =>{
    console.log("Connected to Redis");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

redisClient.client.on("connecting", () => {
    console.log("Connecting to Redis");
})

redisClient.client.on("error",(error) =>{
    console.error("Failed to connect, Retrying ...");
    setTimeout(()=>{ redisClient.connect() },2000);
    
})

export default app;