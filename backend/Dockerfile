FROM node:20 AS backend-builder

WORKDIR /app

COPY . .

RUN npm i

FROM node:20-slim

WORKDIR /app

COPY --from=backend-builder /app .

COPY .env.example .env

EXPOSE 3000

CMD ["npm", "start"]
