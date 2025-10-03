FROM node:22-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY docker.env .env

RUN npm run build


FROM node:22-alpine
WORKDIR /usr/src/app

COPY package*.json ./
COPY src ./src
RUN npm install --production
RUN npm install drizzle-orm

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "deploy"]