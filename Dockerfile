FROM node:lts-bullseye

USER root

WORKDIR /kenaimg

COPY package.json ./
RUN npm install --force

COPY . .
RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]
