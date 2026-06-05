FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY shared ./services/shared
COPY services/admin-service/package.json ./services/admin-service/
WORKDIR /app/services/admin-service
RUN npm install --omit=dev
COPY services/admin-service .
EXPOSE 4007
CMD ["node", "src/index.js"]
