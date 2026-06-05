FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev
COPY services/payment-service/package.json /app/services/payment-service/
WORKDIR /app/services/payment-service
RUN npm install --omit=dev
COPY services/payment-service /app/services/payment-service/
EXPOSE 4005
CMD ["node", "src/index.js"]
