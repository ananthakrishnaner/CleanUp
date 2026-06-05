FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY shared ./services/shared
COPY services/notification-service/package.json ./services/notification-service/
WORKDIR /app/services/notification-service
RUN npm install --omit=dev
COPY services/notification-service .
EXPOSE 4006
CMD ["node", "src/index.js"]
