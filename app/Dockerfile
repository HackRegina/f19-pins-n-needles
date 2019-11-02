FROM node:10
WORKDIR /app/
COPY app/package.json app/yarn.lock /app/
RUN yarn
COPY app /app/
CMD yarn run start:dev
