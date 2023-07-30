FROM node:18-alpine

WORKDIR /app

COPY ./package.json /app
COPY ./yarn.lock /app
RUN yarn
COPY ./knexfile.ts /app
COPY ./migrations /app/migrations
COPY ./.env /app/.env
CMD yarn migrate
