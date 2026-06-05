FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev
COPY services/notification-service/package.json /app/services/notification-service/
WORKDIR /app/services/notification-service
RUN npm install --omit=dev
COPY services/notification-service /app/services/notification-service/
EXPOSE 4006
CMD ["node", "src/index.js"]
