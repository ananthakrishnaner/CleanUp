FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY shared ./services/shared
COPY services/promo-service/package.json ./services/promo-service/
WORKDIR /app/services/promo-service
RUN npm install --omit=dev
COPY services/promo-service .
EXPOSE 4012
CMD ["node", "src/index.js"]
