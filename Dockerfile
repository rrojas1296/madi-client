FROM node:lts-alpine AS builder

RUN apk add --no-cache openssl bash curl unzip

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun run build

FROM node:lts-alpine

RUN apk add --no-cache openssl bash curl unzip

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next ./.next

COPY package*.json ./

RUN bun install

EXPOSE 3000

CMD ["npm", "run", "start"]
