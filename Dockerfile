FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable



# Build image with dev dependencies
FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm turbo build
RUN pnpm deploy --prod --filter=flexydox-cli /cli
#RUN pnpm turbo build


FROM base AS app
WORKDIR /app
COPY --from=build /cli /app
COPY --from=build /app/packages/flexydox-renderer/src /app/astro/src/
COPY --from=build /app/packages/flexydox-renderer/public /app/astro/public/
COPY --from=build /app/packages/flexydox-renderer/package.json /app/astro
RUN pnpm link --global




