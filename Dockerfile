FROM denoland/deno:alpine

USER deno
WORKDIR /

ADD . .
RUN deno task cache
ENV MODE=production

CMD ["task", "start"]
