FROM node:10
WORKDIR /api/
COPY ./api/package.json ./api/yarn.lock /api/
RUN yarn
COPY api /api/
CMD yarn run start:dev
