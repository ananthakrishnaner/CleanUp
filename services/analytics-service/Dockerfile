FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY services/shared ./services/shared
COPY services/analytics-service/package.json ./services/analytics-service/
WORKDIR /app/services/analytics-service
RUN npm install --omit=dev
COPY services/analytics-service .
EXPOSE 4014
CMD ["node", "src/index.js"]
