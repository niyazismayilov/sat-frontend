FROM node:14.17.0-alpine as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --production=false

COPY . .

RUN yarn build

FROM nginx:1.19.6-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /
RUN chmod +x docker-entrypoint.sh

RUN apk add --no-cache nodejs-current yarn jq bash
RUN yarn global add dotenv-to-json @ethical-jobs/dynamic-env

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build .
COPY --from=builder /app/.env.gen .env.example

ENTRYPOINT ["/docker-entrypoint.sh"]
