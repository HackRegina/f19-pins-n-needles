FROM node:10
WORKDIR /app/app/
COPY app/package.json app/yarn.lock /app/app/
RUN yarn
COPY app /app/app
CMD yarn run start:dev
