# Use denoland/deno:alpine if you don't need bash (like when you're using zx library
FROM denoland/deno:debian

WORKDIR /action
COPY ./ ./
RUN deno check src/action.ts src/pre.ts src/post.ts
ENTRYPOINT ["/action/src/index.ts"]
