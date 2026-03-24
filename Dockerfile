FROM oven/bun:1-alpine AS development
WORKDIR /usr/src/app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile
COPY . .

# Command to run the application in development mode
CMD [ "bun", "run", "start:dev" ]

# Stage 2: Production
FROM oven/bun:1-alpine AS production
WORKDIR /usr/src/app
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile --production
COPY . .
RUN bun run build
CMD [ "bun", "run", "dist/main.js" ]
