FROM denoland/deno:debian
WORKDIR /action
COPY ./ ./
RUN deno check src/action.ts
# TODO: Change allow-all for something minimal
ENTRYPOINT ["deno", "run", "--cached-only", "--allow-all", "/action/src/action.ts"]
