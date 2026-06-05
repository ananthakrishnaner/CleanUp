FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY shared ./services/shared
COPY services/payment-service/package.json ./services/payment-service/
WORKDIR /app/services/payment-service
RUN npm install --omit=dev
COPY services/payment-service .
EXPOSE 4005
CMD ["node", "src/index.js"]
