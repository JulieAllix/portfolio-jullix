FROM node:14-alpine

COPY ./backend/ /app/backend
COPY ./webroot/ /app/webroot
COPY ./models/ /app/models

EXPOSE 443/tcp
EXPOSE 80/tcp

ENV NODE_ENV production

WORKDIR /app/backend

RUN yarn --prod

ENTRYPOINT yarn prod
