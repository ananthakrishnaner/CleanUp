FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
COPY services/booking-service/package.json ./services/booking-service/
WORKDIR /app/services/booking-service
RUN npm install --omit=dev
COPY services/booking-service .
EXPOSE 4004
CMD ["node", "src/index.js"]
