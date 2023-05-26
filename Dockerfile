FROM denoland/deno:alpine

USER deno
WORKDIR /

ADD . .
RUN deno task cache

EXPOSE 80

ENV MODE=production
ENV SERVER_PORT=80

CMD ["task", "start"]
