docker compose down
docker container ls -a --format {{".Names"}} | grep 'the-shortest-url-.*-redis-' | xargs -I {} docker container rm {}
docker container rm url_redis_1
docker volume ls -q | grep 'the-shortest-url-.*_redis-' | xargs -I {} docker volume rm {}