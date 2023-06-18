#!/bin/bash
redis-server --appendonly yes --cluster-enabled yes --cluster-config-file nodes.conf --cluster-node-timeout 5000 --port 8001 &
bash /tmp/create_cluster.sh
tail -f /dev/null