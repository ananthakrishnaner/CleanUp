FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY shared ./services/shared
COPY services/cleaner-service/package.json ./services/cleaner-service/
WORKDIR /app/services/cleaner-service
RUN npm install --omit=dev
COPY services/cleaner-service .
EXPOSE 4003
CMD ["node", "src/index.js"]
