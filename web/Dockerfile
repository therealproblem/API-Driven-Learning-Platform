FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json ./ 
RUN npm install
COPY . .
COPY docker.env .env
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 5173

CMD ["node", "build"]
