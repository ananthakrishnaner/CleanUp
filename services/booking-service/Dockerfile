FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev
COPY services/booking-service/package.json /app/services/booking-service/
WORKDIR /app/services/booking-service
RUN npm install --omit=dev
COPY services/booking-service /app/services/booking-service/
EXPOSE 4004
CMD ["node", "src/index.js"]
