# Use denoland/deno:alpine if you don't need bash (like when you're using zx library
FROM denoland/deno:debian
WORKDIR /action
COPY ./ ./
RUN deno check src/action.ts
# Do not forget to change --allow-all for approvals which are necessary for your action
ENTRYPOINT ["deno", "run", "--cached-only", "--allow-all", "/action/src/index.ts"]
