FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable



# Build image with dev dependencies
FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm turbo build
RUN pnpm deploy --prod --filter=cli /cli



FROM base AS app
WORKDIR /app

COPY --from=build /cli /app
COPY --from=build /app/packages/renderer/src /app/astro/src/
COPY --from=build /app/packages/renderer/public /app/astro/public/
COPY --from=build /app/packages/renderer/package.json /app/astro
RUN pnpm link --global




