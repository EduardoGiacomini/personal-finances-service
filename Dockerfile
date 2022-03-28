FROM node:16.14.2-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]
