sleep 10
redis-cli --cluster create 10.60.0.11:8001 10.60.0.12:8002 10.60.0.13:8003 10.60.0.14:8004 10.60.0.15:8005 10.60.0.16:8006 --cluster-replicas 1 --cluster-yes
