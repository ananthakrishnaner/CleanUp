FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY promo-service/package.json ./
COPY shared ./shared
RUN npm install --omit=dev
COPY promo-service .
EXPOSE 4012
CMD ["node", "src/index.js"]
