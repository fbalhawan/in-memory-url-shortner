FROM redis:latest
COPY ./create_cluster.sh /tmp/
COPY ./entrypoint.sh /tmp/
RUN chmod +x /tmp/create_cluster.sh /tmp/entrypoint.sh
ENTRYPOINT ["/tmp/entrypoint.sh"]