FROM node:8-alpine


COPY .docker/rootfs /

COPY _dist/ /app/

RUN chmod +x /entrypoint.sh \
 && chown -R node:node /app

ENV SHARE_APP=0


WORKDIR /app

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]

CMD ["node", "./server.js"]
