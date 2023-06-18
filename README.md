# In-memory URL Shortner

An in-memory URL shortner that stores data across a Redis cluster.
The project consists of 7 services, Rest-API, and 6 Redis nodes running in a cluster. The Redis Cluster stores a mapping of shortURL->fullURL.

## Dependencies
You need to have `docker` & `docker compose` installed on your machine.

Also `npm` and `tsc` to run the tests

## Run
while in the root directory, run
```bash
npm run clean && npm run dev
```
The following script will fetch the necessary docker images and run the containers. The Rest-API server will run on http://localhost:3001/


## Usage

The server exposes 2 end points:
1. `GET /api/encode/:url` 
 
A successful response looks like this:
```json
{
    "shortUrl": "http://short.est/dxu99c",
    "encoded": "http%3A%2F%2Fshort.est%2Fdxu99c"
}
```

2. `GET /api/decode/:url`

This endpoint expects an encoded URI at the end, a successful response is a `302` redirect to the original URL that was encoded.


