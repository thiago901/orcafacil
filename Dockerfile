FROM node:18-slim

RUN apt-get update && apt-get install -y openssl libssl1.1
WORKDIR /app

COPY package.json .

RUN npm cache clear --force
RUN npm install

COPY . .

ENV NODE_ENV=dev



RUN npm run prisma:generate

RUN npm run build


CMD ["sh","-c","npx prisma migrate deploy && npm run start:seed && npm run start:prod"]