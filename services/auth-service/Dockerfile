FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY shared ./services/shared
COPY services/auth-service/package.json ./services/auth-service/
WORKDIR /app/services/auth-service
RUN npm install --omit=dev
COPY services/auth-service .
EXPOSE 4001
CMD ["node", "src/index.js"]
