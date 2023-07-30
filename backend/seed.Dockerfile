FROM node:18-alpine

WORKDIR /app

COPY ./package.json /app
COPY ./yarn.lock /app
RUN yarn
COPY ./knexfile.ts /app
COPY ./seeds /app/seeds
COPY ./.env /app/.env
CMD yarn seed
