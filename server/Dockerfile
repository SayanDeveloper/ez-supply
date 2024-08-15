FROM node:14-alpine

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . .

CMD ["yarn", "start"]

EXPOSE 7000
