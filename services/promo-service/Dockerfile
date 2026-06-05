FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev
COPY services/promo-service/package.json /app/services/promo-service/
WORKDIR /app/services/promo-service
RUN npm install --omit=dev
COPY services/promo-service /app/services/promo-service/
EXPOSE 4012
CMD ["node", "src/index.js"]
