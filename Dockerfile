FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

RUN yarn global add serve

COPY . .

RUN yarn

EXPOSE 3003

CMD [ "serve", "-s", "dist" ]