FROM node:lts-bullseye-slim

USER root

WORKDIR /kenaimg

COPY package.json ./

RUN apt update && apt install -y python3 build-essential
RUN npm install --force

COPY . .
RUN npm run build

RUN rm -fr src

EXPOSE 4000

CMD ["npm", "start"]
