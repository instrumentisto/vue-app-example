FROM instrumentisto/node-builder

COPY .docker/rootfs /

RUN chmod +x /start.sh

WORKDIR /app

CMD ["/start.sh"]
