FROM node:10
WORKDIR /app/api/
COPY ./api/package.json ./api/yarn.lock /app/api/
RUN yarn
COPY api /app/api/
CMD yarn run start:dev
