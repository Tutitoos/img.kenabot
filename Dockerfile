FROM node:lts-bullseye

USER root

WORKDIR /kenaimg

COPY package.json ./

RUN apt update

RUN npm install -g npm@latest
RUN npm install --force

COPY . .
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
