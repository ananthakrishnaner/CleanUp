FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY shared ./services/shared
COPY services/loyalty-service/package.json ./services/loyalty-service/
WORKDIR /app/services/loyalty-service
RUN npm install --omit=dev
COPY services/loyalty-service .
EXPOSE 4013
CMD ["node", "src/index.js"]
