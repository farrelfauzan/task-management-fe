FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

RUN yarn global add serve

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "preview" ]