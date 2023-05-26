FROM denoland/deno:alpine

USER deno
WORKDIR /

ADD . .
RUN deno task cache

EXPOSE 80

ENV MODE="DEPLOY"

CMD ["task", "start"]
